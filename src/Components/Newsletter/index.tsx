import React, {useState} from "react";
import style from "./index.module.scss";
import {toast} from "react-toastify";
import {EmailService} from "@/Services";

export default function Newsletter() {
  const [email, setEmail] = useState<string>("");
  const onSubscribe = async () => {
    if (!email) {
      return toast.error("Please enter your email address");
    }
    if (email) {
      try {
        toast.success("Subscribed!");
        await EmailService.addNewsletter(email);
        toast.success("Subscribed!");
      } catch (error: any) {
        // toast.error(error.message);
      }
    }
  };

  return (
    <div id={style["newsletter"]}>
      <p className="text-center">Join the waitlist for early access</p>
      <div id={style["email-form"]} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button type="button" className="input-group-text" onClick={onSubscribe}>Subscribe</button>
      </div>
    </div>
  );
}
