import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

// import {
//   createUserDocumentFromAuth,
//   onAuthStateChangedListener,
//   getCurrentUser,
// } from "./utils/firebase/firebase.utils";

import Home from "./routes/home/home.component";
import Nav from "./routes/nav/nav.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import PaymentStatus from "./compoments/payment-status/payment-status.component";
import UploadFeed from "./routes/feeds-upload/UploadFeed";
import Feed from "./routes/feeds-view/feeds";
// import { setCurrentUser } from "./store/user/user.action";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });
    // return unsubscribe;
    // getCurrentUser().then((user) => console.log(user));
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="payment-status" element={<PaymentStatus />} />
        <Route path="upload-feed" element={<UploadFeed />} />
        <Route path="feeds" element={<Feed />} />
      </Route>
    </Routes>
  );
};

export default App;
