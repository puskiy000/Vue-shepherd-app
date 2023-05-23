import React, { useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  Box,
  SimpleGrid,
  Stack,
  Select,
  Flex,
  Spacer,
  FormControl,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormLabel,
} from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";
import Banner from "./components/Banner";
import TutorCard from "./components/TutorCard";
import { MdTune } from "react-icons/md";
import { CustomButton } from "./layout";
import Star5 from "../../assets/5star.svg";
import { BsStarFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { formatContentFulCourse, getContentfulClient } from "../../contentful";
import { Course, Schedule } from "../../types";
import { useFormik } from "formik";
import ApiService from "../../services/ApiService";
import TimezoneSelect from "../../components/TimezoneSelect";
import TimePicker from "../../components/TimePicker";
import { numberToDayOfWeekName } from "../../util";
import CustomSelect from "../../components/Select";
import moment from "moment";

const levelOptions = [
  { value: "a-level", label: "A-Level", id: 1 },
  { value: "gcse", label: "GCSE", id: 2 },
  { value: "university", label: "University", id: 3 },
  { value: "grade10", label: "Grade 10", id: 4 },
  { value: "grade11", label: "Grade 11", id: 5 },
  { value: "grade12", label: "Grade 12", id: 6 },
];
const priceOptions = [
  { value: "10-12", label: "$10.00 - $12.00", id: 1 },
  { value: "12-15", label: "$12.00 - $15.00", id: 2 },
  { value: "15-20", label: "$15.00 - $20.00", id: 3 },
  { value: "20-25", label: "$20.00 - $25.00", id: 4 },
];

const ratingOptions = [
  { value: "1star", label: "⭐", id: 1 },
  { value: "2star", label: "⭐⭐", id: 2 },
  { value: "3star", label: "⭐⭐⭐", id: 3 },
  { value: "4star", label: "⭐⭐⭐⭐", id: 4 },
  { value: "5star", label: "⭐⭐⭐⭐⭐", id: 5 },
];

const dayOptions = [...new Array(7)].map((_, i) => {
  return { label: numberToDayOfWeekName(i), value: i };
});
const client = getContentfulClient();
const defaultTime = "";

export default function Marketplace() {
  const [allTutors, setAllTutors] = useState<any>([]);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [tz, setTz] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [days, setDays] = useState<Array<any>>([]);

  const formik = useFormik({
    initialValues: {
      subject: "",
      level: "",
      //   toTime: toTime,
      //   fromTime: fromTime,
      //   days: days,
      //   tz: tz,
      price: "",
      rating: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log(tz);

  const loadCourses = useCallback(async () => {
    setLoadingCourses(true);

    try {
      const resp = await client.getEntries({
        content_type: "course",
      });

      let newCourseList: Array<Course> = [];
      resp.items.map((i: any) => {
        newCourseList.push(formatContentFulCourse(i));
      });

      setCourseList(newCourseList);
    } catch (e) {}
    setLoadingCourses(false);
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const getData = async () => {
    setLoadingData(true);
    try {
      const resp = await ApiService.getAllTutors();
      const data = await resp.json();
      setAllTutors(data);
    } catch (e) {}
    setLoadingData(false);
  };
  const getFilteredData = async (filterParams: any) => {
    setLoadingData(true);
    try {
      const resp = await ApiService.getFilteredTutors();
      const data = await resp.json();
      setAllTutors(data);
    } catch (e) {}
    setLoadingData(false);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(allTutors);

  const resetForm = () => {
    formik.resetForm();
    setTz(defaultTime);
    setDays([]);
    setFromTime("");
    setToTime("");
  };

  return (
    <>
      <Box bgColor={"black"} borderRadius={"14px"} height={"200px"}>
        <Banner />
      </Box>
      <Box mt={3}>
        <Flex>
          <Stack spacing={3} direction="row">
            <Flex alignItems={"center"} mt={2}>
              <Text>
                <MdTune />
              </Text>
              <Text>Filter</Text>
            </Flex>
            <Select
              fontSize={14}
              variant="outline"
              placeholder="Subject"
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
            >
              {courseList.map((course) => (
                <option key={course.id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </Select>
            <Select
              fontSize={14}
              variant="outline"
              placeholder="Level"
              name="level"
              value={formik.values.level}
              onChange={formik.handleChange}
            >
              {levelOptions.map((level) => (
                <option key={level.id} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Select>

            <Box>
              {" "}
              <Menu>
                <MenuButton
                  as={Button}
                  variant="outline"
                  rightIcon={<FiChevronDown />}
                  fontSize={14}
                  fontWeight={500}
                  color="#5C5F64"
                >
                  Availability
                </MenuButton>
                <MenuList p={5}>
                  <Box>
                    <Box fontSize={14} mb={2} color="#5C5F64">
                      Days
                    </Box>

                    <CustomSelect
                      value={days}
                      isMulti
                      onChange={(v) => setDays(v as Array<any>)}
                      tagVariant="solid"
                      options={dayOptions}
                      size={"md"}
                    />
                  </Box>
                  <Box>
                    <FormControl>
                      <Box fontSize={14} my={2} color="#5C5F64">
                        Timezone
                      </Box>

                      <TimezoneSelect
                        value={tz}
                        onChange={(v) => setTz(v.value)}
                      />
                    </FormControl>
                  </Box>{" "}
                  <Box my={3}>
                    <FormControl>
                      <Box display={"flex"} alignItems="center" gap={"7px"}>
                        <Box>
                          <Box fontSize={14} my={2} color="#5C5F64">
                            Start Time
                          </Box>
                          <TimePicker
                            inputGroupProps={{ size: "lg" }}
                            inputProps={{ size: "md", placeholder: "01:00 PM" }}
                            value={fromTime}
                            onChange={(v: string) => {
                              setFromTime(v);
                            }}
                          />
                        </Box>

                        <Box>
                          <Box fontSize={14} my={2} color="#5C5F64">
                            End Time
                          </Box>

                          <TimePicker
                            inputGroupProps={{ size: "md" }}
                            inputProps={{ placeholder: "06:00 PM" }}
                            value={toTime}
                            onChange={(v: string) => {
                              setToTime(v);
                            }}
                          />
                        </Box>
                      </Box>
                    </FormControl>
                  </Box>
                </MenuList>
              </Menu>
            </Box>
            <Select
              fontSize={14}
              variant="outline"
              placeholder="Price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            >
              {priceOptions.map((price) => (
                <option key={price.id} value={price.value}>
                  {price.label}
                </option>
              ))}
            </Select>
            <Select
              fontSize={14}
              variant="outline"
              placeholder="Rating"
              name="rating"
              value={formik.values.rating}
              onChange={formik.handleChange}
            >
              {ratingOptions.map((rating) => (
                <option key={rating.id} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </Select>
          </Stack>

          <Spacer />
          <CustomButton
            buttonText={"Clear Filters"}
            buttonType="outlined"
            fontStyle={{ fontSize: "12px", fontWeight: 500 }}
            onClick={resetForm}
          />
          <CustomButton
            buttonText={"Apply Filters"}
            buttonType="fill"
            fontStyle={{ fontSize: "12px", fontWeight: 500 }}
            onClick={getFilteredData}
          />
        </Flex>
      </Box>
      <Box my={45} py={2}>
        <SimpleGrid minChildWidth="359px" spacing="30px">
          {allTutors.map((tutor: any) => (
            <TutorCard
              key={tutor._id}
              id={tutor._id}
              name={`${tutor.name.first} ${tutor.name.last} `}
              levelOfEducation={tutor.highestLevelOfEducation}
              avatar={tutor.avatar}
              rate={tutor.rate}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
