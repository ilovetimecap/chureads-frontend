import React, { useState } from "react";
import InputField from "../components/InputField";
import LoginButton from "../components/LoginButton";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  // logic
  const history = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (inputValue, field) => {
    if (field === "name") {
      setName(inputValue);
    } else if (field === "email") {
      setEmail(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault(); // 폼 제출시 새로고침 방지 메소드

    setErrorMessage("");

    // 로딩중이면 사용자가 name, emaill, password값 작성 안하면 실행안함
    if (isLoading || !name || !email || !password) return;

    setIsLoading(true);

    try {
      // 비동기 처리 성공시

      // 계정 생성
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 사용자 프로필 이름 지정
      await updateProfile(credential.user, {
        displayName: name,
      });

      // 홈화면으로 리다이렉트
      history("/");
    } catch (error) {
      // 비동기 처리에서 에러난 경우
      console.error("code!!", error.code);
      console.error(error.message);
      setErrorMessage(
        error.code === "auth/weak-password"
          ? "비밀번호 6자리 이상 입력해주세요"
          : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // view
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="text-center px-6">
        <h1 className="flex justify-center">
          <img src="./images/logo.svg" alt="churead로고" />
        </h1>
        <h3 className="text-red font-bold text-base py-6">
          Churead에서 소통해보세요
        </h3>
        {/* START: 폼 영역 */}
        <form
          id="login-form"
          className="text-center flex flex-col gap-2"
          onSubmit={handleSignUp}
        >
          <InputField type="text" field="name" onChange={handleInputChange} />
          <InputField type="text" field="email" onChange={handleInputChange} />
          <InputField
            type="password"
            field="password"
            onChange={handleInputChange}
          />
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <LoginButton
            category="login"
            text={isLoading ? "Loading 중" : "Create Account"}
          />
        </form>
        {/* END: 폼 영역 */}
        <div className="flex justify-center gap-1 py-6">
          <p className="text-churead-gray-600">계정이 있으신가요?</p>
          <Link to="/login" className="text-churead-blue">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
