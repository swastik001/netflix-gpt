import { useEffect } from "react";
import { auth } from "../ulits/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../ulits/userSlice";
import { LOGO } from "../ulits/constant";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // dispatch(removeUser());
        // navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: user.photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //this is kind of event-listener whenever user signs in/signs out,therefor cleaning it up is important

    return () => {
      unSubscribe(); // Clean up the subscription
    };
  }, []);

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex ">
          <img
            alt="user-icon"
            className="w-12 h-12 rounded-xl"
            src={user.photoURL || "https://example.com/default-profile.png"}
          />
          <button
            onClick={handleSignOut}
            className="bg-red-700 text-white px-4 py-2 rounded ml-4"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
