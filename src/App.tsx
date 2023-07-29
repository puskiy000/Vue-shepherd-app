import { ThemeProvider } from 'styled-components';
import resourceStore from './state/resourceStore';
import userStore from './state/userStore';
import theme from './theme';
import CreatePassword from './views/CreatePassword';
import StudentSettings from './views/Dashboard/AccountSettings';
import BookmarkedTutors from './views/Dashboard/BookmarkedTutors';
import DocChat from './views/Dashboard/DocChat';
import FlashCard from './views/Dashboard/FlashCards';
import CreateFlashCard from './views/Dashboard/FlashCards/create';
import HomeWorkHelp from './views/Dashboard/HomeWorkHelp';
import Marketplace from './views/Dashboard/Marketplace';
import Messaging from './views/Dashboard/Messaging';
import MyTutors from './views/Dashboard/MyTutors';
import NewNote from './views/Dashboard/Notes/NewNotes';
import Notes from './views/Dashboard/Notes/index';
import Offer from './views/Dashboard/Offer';
import SendTutorOffer from './views/Dashboard/SendTutorOffer';
import Tutor from './views/Dashboard/Tutor';
import DashboardIndex from './views/Dashboard/index';
import DashboardLayout from './views/Dashboard/layout';
import ForgotPassword from './views/ForgotPassword';
import Home from './views/Home';
import Login from './views/Login';
import OnboardStudent from './views/OnboardStudent/index';
import OnboardTutor from './views/OnboardTutor';
import CompleteProfile from './views/OnboardTutor/complete_profile';
import Session from './views/Session';
import Signup from './views/Signup';
import Clients from './views/TutorDashboard/Clients';
import Client from './views/TutorDashboard/Clients/client';
import TutorOffer from './views/TutorDashboard/Offers/TutorOffer';
import TutorOffers from './views/TutorDashboard/Offers/index';
import TutorDashboard from './views/TutorDashboard/index';
import TutorSettings from './views/TutorDashboard/settings';
import PendingVerification from './views/VerificationPages/pending_verification';
import VerificationSuccess from './views/VerificationPages/successful_verification';
import VerifyEmail from './views/VerificationPages/verify_email';
import WelcomeLayout from './views/WelcomeLayout';
import Messages from './views/messages';
import { Box, ChakraProvider, Spinner } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import mixpanel from 'mixpanel-browser';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate, Route, Routes } from 'react-router';
import {
  BrowserRouter,
  useLocation,
  useSearchParams,
  useNavigate
} from 'react-router-dom';

const AuthAction = (props: any) => {
  const [params] = useSearchParams();
  const mode = params.get('mode')?.toLowerCase();

  if (mode === 'resetpassword') {
    return <CreatePassword {...props} />;
  }

  return <></>;
};

const RequireAuth = ({
  authenticated,
  unAuthenticated
}: {
  authenticated: any;
  unAuthenticated: any;
}) => {
  const { fetchUser, user, fetchNotifications, fetchUserDocuments } =
    userStore();
  const [loadingUser, setLoadingUser] = useState(true);

  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [obtainedUserAuthState, setObtainedUserAuthState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      setObtainedUserAuthState(true);
      setFirebaseUser(user);
      if (user) {
        await fetchUser()
          .then(() => {
            fetchNotifications();
            fetchUserDocuments();
          })
          .catch((e) => {
            if (user.metadata.creationTime !== user.metadata.lastSignInTime) {
              navigate('/login');
            }
          });
      }
      setLoadingUser(false);
    });
    /* eslint-disable */
  }, []);

  return obtainedUserAuthState && !loadingUser ? (
    firebaseUser && user ? (
      authenticated
    ) : (
      unAuthenticated
    )
  ) : (
    <Box p={5} textAlign="center">
      <Spinner />
    </Box>
  );
};

const AppRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    mixpanel.track('App Page Viewed', location);
  }, [location]);

  useEffect(() => {
    mixpanel.track_links('a', 'Clicked Link', (el: Element) => {
      return {
        target: el.getAttribute('href')
      };
    });
  }, []);

  return (
    <Routes>
      <Route element={<WelcomeLayout />}>
        <Route path="onboard">
          <Route path="student" element={<OnboardStudent />} />
          <Route path="tutor" element={<OnboardTutor />} />
          <Route path="*" element={<Navigate to="student" />} />
          <Route path="" element={<Navigate to="student" />} />
        </Route>

        <Route
          path="login"
          element={
            <RequireAuth
              authenticated={<Navigate to={'/dashboard'} />}
              unAuthenticated={<Login />}
            />
          }
        />

        <Route
          path="signup"
          element={
            <RequireAuth
              authenticated={<Navigate to={'/dashboard'} />}
              unAuthenticated={<OnboardStudent />}
            />
          }
        />
        <Route
          path="forgot-password"
          element={
            <RequireAuth
              authenticated={<Navigate to={'/dashboard'} />}
              unAuthenticated={<ForgotPassword />}
            />
          }
        />
        <Route path="auth-action" element={<AuthAction />} />
      </Route>

      <Route path="verification_pending" element={<PendingVerification />} />
      <Route path="verification_success" element={<VerificationSuccess />} />

      <Route path="complete_profile" element={<CompleteProfile />} />
      <Route path="verify_email" element={<VerifyEmail />} />

      <Route
        path="login"
        element={
          <RequireAuth
            authenticated={<Navigate to={'/dashboard'} />}
            unAuthenticated={<Login />}
          />
        }
      />
      <Route
        path="signup"
        element={
          <RequireAuth
            authenticated={<Navigate to={'/dashboard'} />}
            unAuthenticated={<Signup />}
          />
        }
      />
      <Route
        path="forgot-password"
        element={
          <RequireAuth
            authenticated={<Navigate to={'/dashboard'} />}
            unAuthenticated={<ForgotPassword />}
          />
        }
      />
      <Route path="auth-action" element={<AuthAction />} />

      <Route path="home" element={<Home />} />
      <Route
        path="dashboard"
        element={
          <RequireAuth
            authenticated={<DashboardLayout children />}
            unAuthenticated={<DashboardLayout children />}
          // unAuthenticated={<Navigate to={"/login"} />}
          />
        }
      >
        <Route element={<DashboardLayout children />} />
        <Route path="new-note">
          <Route path="" element={<NewNote />} />
          <Route path=":id" element={<NewNote />} />
        </Route>
        <Route path="notes" element={<Notes />} />
        <Route path="flashcards">
          <Route path="create" element={<CreateFlashCard />} />
          <Route path="" element={<FlashCard />}></Route>
        </Route>
        <Route path="tutor/:tutorId/offer" element={<SendTutorOffer />} />
        <Route path="offer/:offerId" element={<Offer />} />
        <Route path="home" element={<DashboardIndex />} />
        <Route path="docchat" element={<DocChat />} />
        <Route path="find-tutor" element={<Marketplace />} />
        <Route path="find-tutor/tutor/" element={<Tutor />} />
        <Route path="my-tutors" element={<MyTutors />} />
        <Route path="saved-tutors" element={<BookmarkedTutors />} />
        <Route path="messaging" element={<Messaging />} />{' '}
        <Route path="account-settings" element={<StudentSettings />} />
        <Route path="ace-homework" element={<HomeWorkHelp />} />
        <Route path="" element={<Navigate to="home" />} />
        <Route path="*" element={<Navigate to="home" />} />
      </Route>

      <Route
        path="session/:bookingId"
        element={
          <RequireAuth
            authenticated={<Session />}
            unAuthenticated={<Navigate to={'/login'} />}
          />
        }
      />

      <Route
        path="tutordashboard"
        element={
          <RequireAuth
            authenticated={<TutorDashboard />}
            unAuthenticated={<Navigate to={'/login'} />}
          />
        }
      />

      <Route
        path="tutordashboard/clients"
        element={
          <RequireAuth
            authenticated={<Clients />}
            unAuthenticated={<Navigate to={'/login'} />}
          />
        }
      />

      <Route
        path="tutordashboard/offers"
        element={
          <RequireAuth
            authenticated={<TutorOffers />}
            unAuthenticated={<Navigate to={'/login'} />}
          />
        }
      />

      <Route path="tutordashboard/offers/:id" element={<TutorOffer />} />
      <Route path="tutordashboard/messages" element={<Messages />} />
      <Route path="tutordashboard/tutorsettings" element={<TutorSettings />} />
    </Routes>
  );
};

function App() {
  const { fetchResources, resourcesLoaded } = resourceStore();

  const doFetchResources = useCallback(async () => {
    await fetchResources();
    /* eslint-disable */
  }, []);

  useEffect(() => {
    doFetchResources();
  }, [doFetchResources]);

  if (!resourcesLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <ChakraProvider theme={theme}>
          <Box
            p={5}
            textAlign="center"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
          >
            <Spinner />
          </Box>
        </ChakraProvider>
      </ThemeProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
