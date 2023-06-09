"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.png" alt="Promtopia Logo" height={45} width={45} className="object-cover" />
        <p className="logo_text">Prompt </p>
      </Link>

      {/* Desktop навигация  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn default-hover">
              Создать пост
            </Link>
            <button type="button" onClick={signOut} className="outline_btn default-hover">
              Выйти
            </button>
            <Link href="profile">
              <Image src={session?.user.image} width={37} height={37} className="rounded-full default-hover" />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button className="black_btn default-hover" type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                  Войти <GoogleIcon sx={{ fontSize: 14, marginLeft: "3px", margintop: "2px" }} />
                </button>
              ))}
          </>
        )}
      </div>

      {/* Мобильная навигация */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex ">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prevState) => !prevState)}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link " onClick={() => setToggleDropDown(false)}>
                  Мой профиль
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                  Создать промпт
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  {" "}
                  Выйти
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button className="black_btn" type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                  Войти
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
