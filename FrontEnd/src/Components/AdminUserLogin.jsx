import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./AdminUserLogin.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logInAction } from "../ReduxStore/Slices/logInSlice";

const AdminUserLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // Set the states:
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Login and Sign Up
  const [isChange, setIsChange] = useState(false);

  let nav = useNavigate();

  // Set the refrences:
  const firstName = useRef();
  const lastName = useRef();
  const emailName = useRef();
  const passwordName = useRef();
  const confirmPassValue = useRef();
  const studentRole = useRef();
  const recruiterRole = useRef();

  // Function to user login:
  function getUserData(event) {
    event.preventDefault();

    let email = emailName.current.value;
    let password = passwordName.current.value;

    if (email === "" || password === "") {
      toast.error("All Fields Are Required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must contain 8 characters.");
      return;
    }

    if (isSignUp) {
      let first = firstName.current.value;
      let last = lastName.current.value;
      let confirm = confirmPassValue.current.value;

      if (first === "" || last === "" || confirm === "") {
        toast.error("Please Check Your Credentials.");
        return;
      }
      if (first.length < 3 || last.length < 3) {
        toast.error("Name must contain 3 characters.");
        return;
      }

      if (password === confirm) {
        let signUpObj = {
          firstName: first,
          lastName: last,
          email,
          password,
          userType: studentRole.current.checked ? 1 : 2,
        };

        handleAuth(signUpObj, "signUp").then((data) => {
          if (data) {
            // console.log("res :", data);
            localStorage.setItem("userLogIn", JSON.stringify(data?.token));
            localStorage.setItem("userType", JSON.stringify(data?.userType));
            dispatch(logInAction.setLogIn(true));
            toast.success(data.message || "Logged In Successfully.");

            firstName.current.value = "";
            lastName.current.value = "";
            confirmPassValue.current.value = "";
            emailName.current.value = "";
            passwordName.current.value = "";

            // Check user type and navigate accordingly:
            if (data.userType === 1) {
              nav("/candidateProfile");
            } else if (data.userType === 2) {
              nav("/companyProfile");
            } else {
              toast.error("Invalid user type.");
            }
          }
        });
      } else {
        toast.error("Confirm Password Not Matched.");
        return;
      }
    } else {
      if (isAdmin) {
        // console.log("Admin");

        let logObj = {
          email,
          password,
          userType: 3,
        };

        handleAuth(logObj, "logIn").then((data) => {
          if (data) {
            console.log("res :", data);
            localStorage.setItem("adminLogIn", JSON.stringify(data?.token));
            toast.success(data.message || "Logged In Successfully.");
            nav("/adminPannel/");
          }
        });
      } else {
        // console.log("User");

        let logObj = {
          email,
          password,
          userType: 1 || 2, // Basically i don't need to send usertype in case of login user. So send random value.
        };

        handleAuth(logObj, "logIn").then((data) => {
          if (data) {
            // console.log("res :", data);
            localStorage.setItem("userLogIn", JSON.stringify(data?.token));
            localStorage.setItem("userType", JSON.stringify(data?.userType));

            dispatch(logInAction.setLogIn(true));

            toast.success(data.message || "Logged In Successfully.");

            // Check user type and navigate accordingly:
            if (data.userType === 1) {
              nav("/candidateProfile");
            } else if (data.userType === 2) {
              nav("/companyProfile");
            } else {
              toast.error("Invalid user type.");
            }
          }
        });
      }
    }
  }

  // Function to change password
  function getChangePass(event) {
    event.preventDefault();

    let email = emailName.current.value;
    let password = passwordName.current.value;
    let confirm = confirmPassValue.current.value;

    if (email === "" || password === "" || confirm === "") {
      toast.error("All Fields Are Required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must contain 8 characters.");
      return;
    }

    if (password !== confirm) {
      toast.error("Confirm Password Not Matched.");
      return;
    }

    let changeObj = {
      email,
      newPassword: password,
      userType: isAdmin ? 3 : 1 || 2,
    };

    handleAuth(changeObj, "changePassword").then((data) => {
      if (data) {
        console.log("res :", data);
        toast.success(data.message || "Password Changed Successfully.");
        emailName.current.value = "";
        passwordName.current.value = "";
        confirmPassValue.current.value = "";
        setIsChange(false);
      }
    });
  }

  // Handle LogIn:
  const handleAuth = async (authObj, toggleAuth) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}auth/${
          toggleAuth === "signUp"
            ? "registerUser"
            : toggleAuth === "changePassword"
            ? "changePassword"
            : "loginUser"
        }`,
        authObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      return res.data; // always return only the actual data
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        toast.error(err.response.data.message || "Login failed.");
        console.error("Login Error:", err.response.data);
        setIsLoading(false);
      } else {
        // No response from server (network/server error)
        toast.error("Server not responding. Please try again later.");
        console.error("Login Network Error:", err);
        setIsLoading(false);
      }
      return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div
      className={styles.container}
      style={{
        background: "linear-gradient(to bottom, #ffffff,rgb(206, 243, 206))",
      }}
    >
      {isChange ? (
        <div className={`${styles.mb8}`}>
          <h2
            className={`${styles.text2xl} ${styles.fontSemibold} ${styles.textGray900}`}
            style={{
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Change Password
          </h2>
          <motion.div
            variants={formVariants}
            className={`${styles.bgWhite} ${styles.p8} ${styles.roundedXl} ${styles.shadowSm} ${styles.border} ${styles.borderGray100}`}
          >
            <form className={styles.spaceY4}>
              {/* Email Field */}
              <div>
                <label
                  className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray700} ${styles.mb1}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.wFull} ${styles.px4} ${styles.py2} ${styles.border} ${styles.borderGray200} ${styles.roundedMd} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingGreen100} ${styles.transitionAll}`}
                  ref={emailName}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray700} ${styles.mb1}`}
                >
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="atleast 8 characters"
                  className={`${styles.wFull} ${styles.px4} ${styles.py2} ${styles.border} ${styles.borderGray200} ${styles.roundedMd} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingGreen100} ${styles.transitionAll}`}
                  ref={passwordName}
                  required
                />
              </div>

              {/* Confirm Password (Only for Sign Up) */}
              <div>
                <label
                  className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray700} ${styles.mb1}`}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className={`${styles.wFull} ${styles.px4} ${styles.py2} ${styles.border} ${styles.borderGray200} ${styles.roundedMd} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingGreen100} ${styles.transitionAll}`}
                  ref={confirmPassValue}
                  required
                />
              </div>
              <button
                type="submit"
                className={`${styles.wFull} ${styles.bgGreen500} ${styles.textWhite} ${styles.py2} ${styles.px4} ${styles.roundedMd} ${styles.hoverBgGreen600} ${styles.transitionAll} ${styles.mt6}`}
                style={{ backgroundColor: "rgb(84, 216 ,132)" }}
                onClick={getChangePass}
              >
                Submit
              </button>

              <p
                className={`${styles.textCenter} ${styles.textSm} ${styles.textGray600} ${styles.mt4}`}
              >
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsChange(false)}
                  className={`${styles.textGreen600} ${styles.hoverTextGreen700} ${styles.focusOutlineNone}`}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "16px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </p>
            </form>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className={styles.maxWidthMd}
        >
          <div className={`${styles.textCenter} ${styles.mb8}`}>
            <h2
              className={`${styles.text2xl} ${styles.fontSemibold} ${styles.textGray900}`}
            >
              {isAdmin ? "Admin Login" : isSignUp ? "Sign Up" : "Login"}
            </h2>
            <p
              className={`${styles.mt2} ${styles.textSm} ${styles.textGray600}`}
            >
              {isSignUp
                ? "Create an account to get started"
                : "Please enter your credentials to continue"}
            </p>
          </div>

          <motion.div
            variants={formVariants}
            className={`${styles.bgWhite} ${styles.p8} ${styles.roundedXl} ${styles.shadowSm} ${styles.border} ${styles.borderGray100}`}
          >
            {/* Admin/User Toggle (Only for Login) */}
            {!isSignUp && (
              <div className={`${styles.flex} ${styles.gap2} ${styles.mb6}`}>
                <button
                  onClick={() => setIsAdmin(false)}
                  className={`${styles.flex1} ${styles.py2} ${styles.px4} ${
                    styles.roundedMd
                  } ${styles.transitionAll} ${
                    !isAdmin
                      ? `${styles.bgGreen50} ${styles.textGreen700} ${styles.border2} ${styles.borderGreen200}`
                      : `${styles.bgGray50} ${styles.textGray600} ${styles.border} ${styles.borderGray200} ${styles.hoverBgGray100}`
                  }`}
                >
                  User
                </button>
                <button
                  onClick={() => setIsAdmin(true)}
                  className={`${styles.flex1} ${styles.py2} ${styles.px4} ${
                    styles.roundedMd
                  } ${styles.transitionAll} ${
                    isAdmin
                      ? `${styles.bgGreen50} ${styles.textGreen700} ${styles.border2} ${styles.borderGreen200}`
                      : `${styles.bgGray50} ${styles.textGray600} ${styles.border} ${styles.borderGray200} ${styles.hoverBgGray100}`
                  }`}
                >
                  Admin
                </button>
              </div>
            )}

            {/* Form */}
            <form className={styles.spaceY4}>
              {/* First Name and Last Name (Only for Sign Up) */}
              {isSignUp && (
                <div className={`${styles.flex} ${styles.gap4}`}>
                  <div className={styles.flex1}>
                    <label
                      className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray700} ${styles.mb1}`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="First name"
                      className={`${styles.wFull} ${styles.px4} ${styles.py2} ${styles.border} ${styles.borderGray200} ${styles.roundedMd} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingGreen100} ${styles.transitionAll}`}
                      ref={firstName}
                      required
                    />
                  </div>
                  <div className={styles.flex1}>
                    <label
                      className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray700} ${styles.mb1}`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Last name"
                      className={`${styles.wFull} ${styles.px4} ${styles.py2} ${styles.ml4} ${styles.border} ${styles.borderGray200} ${styles.roundedMd} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingGreen100} ${styles.transitionAll}`}
                      style={{ width: "200px" }}
                      ref={lastName}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label
                  className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray700} ${styles.mb1}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.wFull} ${styles.px4} ${styles.py2} ${styles.border} ${styles.borderGray200} ${styles.roundedMd} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingGreen100} ${styles.transitionAll}`}
                  ref={emailName}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray700} ${styles.mb1}`}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="atleast 8 characters"
                  className={`${styles.wFull} ${styles.px4} ${styles.py2} ${styles.border} ${styles.borderGray200} ${styles.roundedMd} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingGreen100} ${styles.transitionAll}`}
                  ref={passwordName}
                  required
                />
              </div>

              {/* Confirm Password (Only for Sign Up) */}
              {isSignUp && (
                <div>
                  <label
                    className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray700} ${styles.mb1}`}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className={`${styles.wFull} ${styles.px4} ${styles.py2} ${styles.border} ${styles.borderGray200} ${styles.roundedMd} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingGreen100} ${styles.transitionAll}`}
                    ref={confirmPassValue}
                    required
                  />
                </div>
              )}

              {/* Remember Me and Forgot Password (Only for Login) */}
              {
                <div
                  className={`${styles.flex} ${styles.itemsCenter} ${styles.justifyBetween} ${styles.textSm}`}
                >
                  {!isAdmin && isSignUp && (
                    <label className={styles.flexItemsCenter}>
                      <input
                        type="radio"
                        className={styles.mr2}
                        name="role"
                        value="1"
                        ref={studentRole}
                        style={{ marginLeft: "10px" }}
                        defaultChecked={true}
                      />
                      Student
                      <input
                        type="radio"
                        className={styles.mr2}
                        name="role"
                        value="2"
                        ref={recruiterRole}
                        style={{ marginLeft: "10px" }}
                      />
                      Recruiter
                    </label>
                  )}

                  {!isSignUp && (
                    <a
                      href="#"
                      className={`${styles.textGreen600} ${styles.hoverTextGreen700}`}
                      onClick={() => setIsChange(true)}
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
              }

              {/* Submit Button */}
              <button
                type="submit"
                className={`${styles.wFull} ${styles.bgGreen500} ${styles.textWhite} ${styles.py2} ${styles.px4} ${styles.roundedMd} ${styles.hoverBgGreen600} ${styles.transitionAll} ${styles.mt6}`}
                style={{ backgroundColor: "rgb(84, 216 ,132)" }}
                onClick={getUserData}
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>

              {/* Toggle between Login and Sign Up (Only for User) */}
              {!isAdmin && !isSignUp && (
                <p
                  className={`${styles.textCenter} ${styles.textSm} ${styles.textGray600} ${styles.mt4}`}
                >
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className={`${styles.textGreen600} ${styles.hoverTextGreen700} ${styles.focusOutlineNone}`}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      fontSize: "16px",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Sign up
                  </button>
                </p>
              )}

              {/* Toggle back to Login (Only for Sign Up) */}
              {isSignUp && (
                <p
                  className={`${styles.textCenter} ${styles.textSm} ${styles.textGray600} ${styles.mt4}`}
                >
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className={`${styles.textGreen600} ${styles.hoverTextGreen700} ${styles.focusOutlineNone}`}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      fontSize: "16px",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </button>
                </p>
              )}
            </form>
            {isLoading && (
              <div className={`${styles.spinner_overlay}`}>
                <div className={`${styles.spinner}`} />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminUserLogin;
