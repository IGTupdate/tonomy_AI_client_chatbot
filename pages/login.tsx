import { useEffect } from "react";
import { useRouter } from "next/router";

import { login } from "../redux/actions/AuthActions";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import MicrosoftLogin from "react-microsoft-login";

import axios from "axios";

import { Fragment, useState } from "react";
import Head from "next/head";
import Main from "@/components/layout/Main";
import { notification } from "antd";
interface User {
  access_token: string;
  // Other properties if needed
}

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({ access_token: "" });

  const [accessToken, setAccessToken] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [optionsVisibity, setOptionsVisibility] = useState(true);

  useEffect(() => {
    const start = async () => {
      const gapi = await import("gapi-script").then((pack) => pack.gapi);
      gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            "1037111719801-57leuusf3igree0os4oaa7iu2qf8uocs.apps.googleusercontent.com",
          scope: "email",
        });
      });
    };
    start();
  }, []);

  const authHandler = (err: any, data: any) => {
    if (data && data.authResponseWithAccessToken) {
      setAccessToken(data.authResponseWithAccessToken.accessToken);
    }
    setOptionsVisibility(false);
    setAuthorized(true);
  };

  const logins = useGoogleLogin({
    onSuccess: (codeResponse: any) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res: any) => {
          const loginData = {
            mail: res.email,
            type: 1,
          };
          await login(loginData)
            .then((result: any) => {
              const token = result.data.token;
              localStorage.setItem("jwtToken", token);
              notification.success({ message: `Successfully Login` });
              router.push("/chatbot");
            })
            .catch((err) => console.log("eeeeeeeeeee", err));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <Main>
      <Fragment>
        <Head>
          <title>Login</title>
        </Head>
        <section id="loginPage">
          <div className="login-main-box">
            <div className="container">
              <div className="log-google">
                <div className="flex">
                  <div className="login">
                    <div className="oauth-btn">
                      <div className="oauth-element">
                        <button
                          className="oauth-google-element bg-transparent shadow-none"
                          onClick={() => logins()}
                        >
                          <img
                            className="google-icon mr-4"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          />
                          Sign in with Google
                        </button>
                      </div>

                      <div className="oauth-element">
                        <MicrosoftLogin
                          clientId={"baa3b947-094b-490f-91c6-318f2eabf0fe"}
                          authCallback={authHandler}
                          graphScopes={["user.read", "Files.Read.All"]}
                          // eslint-disable-next-line react/no-children-prop
                          children={undefined}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    </Main>
  );
};

export default Login;
