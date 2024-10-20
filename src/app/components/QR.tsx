"use client"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function QR(props: { aToken?: RequestCookie }) {
    console.log(props.aToken);

    return (
        <></>
    )
}