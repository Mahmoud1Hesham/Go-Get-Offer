"use client";

import * as React from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/Components/chadcn-ui/otp/input-otp";

export default function OTPInput({ length = 6, value, onChange }) {
    return (
        <div className="space-y-2 flex flex-col items-center justify-center">
            <InputOTP
                maxLength={length}
                value={value}
                onChange={onChange}
            >
                <InputOTPGroup>
                    {Array.from({ length }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                    ))}
                </InputOTPGroup>
            </InputOTP>

            <div className="text-center text-sm">
                {value === "" ? (
                    <>Enter your one-time password.</>
                ) : (
                    <>You entered: {value}</>
                )}
            </div>
        </div>
    );
}
