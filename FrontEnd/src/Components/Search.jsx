import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { searchDataAction } from "../ReduxStore/Slices/SearchDataSlice";

function Search() {
  let nav = useNavigate();
  let dispatch = useDispatch();

  // Creating the refrences:
  const titleRef = useRef();
  const locationRef = useRef();
  const empRef = useRef();

  const searchData = () => {
    let titleValue = titleRef.current.value;
    let locationValue = locationRef.current.value;
    let empValue = empRef.current.value;

    if (!titleValue || !locationValue || !empValue) {
      toast.error("Please Enter All Details.");
      return;
    }

    // console.log("title", titleValue);
    // console.log("location", locationValue);
    // console.log("empStatus", empValue);

    getSearchData()
      .then((res) => {
        if (res) {
          toast.success("Jobs Fetched Successfully.");
          nav("/searchListJobs");
        } else toast.error("Error While Fetching Details.");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const getSearchData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}search/jobs`,
        {
          jobTitle: titleRef.current.value,
          jobLocation: locationRef.current.value,
          empStatus: empRef.current.value,
        }
      );
      console.log("response:", res.data.data);
      if (res) {
        dispatch(searchDataAction.setData(res.data?.data));
        return 1;
      } else return 0;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  };

  return (
    <>
      <form className="search-jobs-form">
        <div className="row mb-5">
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Job title, Company..."
              ref={titleRef}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <select
              className="form-control"
              data-style="btn-white btn-lg"
              data-width="100%"
              data-live-search="true"
              title="Select Region"
              ref={locationRef}
            >
              <option>Anywhere</option>
              <option>Delhi</option>
              <option>Noida</option>
              <option>Mohali</option>
              <option>Pune</option>
              <option>Mumbai</option>
              <option>Banglore</option>
              <option>Chennai</option>
              <option>Kolkata</option>
              <option>Hydrabad</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <select
              className="form-control"
              data-style="btn-white btn-lg"
              data-width="100%"
              data-live-search="true"
              title="Select Job Type"
              ref={empRef}
            >
              <option>PartTime</option>
              <option>FullTime</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block text-white btn-search"
              onClick={searchData}
            >
              <span className="icon-search icon mr-2" />
              Search Job
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 popular-keywords">
            <h3>Trending Keywords:</h3>
            <ul className="keywords list-unstyled m-0 p-0">
              <li>
                <a href="#" className="ml-2">
                  UI/UX Designer
                </a>
              </li>
              <li>
                <a href="#" className="ml-2">
                  Python
                </a>
              </li>
              <li>
                <a href="#" className="ml-2">
                  Full Stack Developer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </>
  );
}

export default Search;
