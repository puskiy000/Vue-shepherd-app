import middy from '../utils/middy';
import authMiddleware from "../middlewares/authMiddleware";
import { HTTPEvent } from "../types";
import User from "../database/models/User";
import { getAuth } from 'firebase-admin/auth';
import { first, last } from 'lodash';

const me = async (event: HTTPEvent) => {
    const { firebaseUser } = event;
    let user = await User.findOne({ firebaseId: firebaseUser.user_id });

    if (!user) {
        const firebaseUserObject = await getAuth().getUser(firebaseUser.user_id);
        const names = firebaseUserObject.displayName?.split(' ');

        user = await User.create({
            firebaseId: firebaseUser.user_id,
            email: firebaseUser.email,
            name: {
                first: first(names),
                last: last(names)
            }
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    }
}

export const handler = middy(me).use(authMiddleware());