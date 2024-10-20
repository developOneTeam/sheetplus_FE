import AdminMenu from "@/app/components/AdminMenu";
import { adminLayout } from "@/app/styles/layouts.css";
import React from "react";

export default function Layout(props: {
    children: React.ReactNode,
    
}) {
    return (
        <>
        <div className={adminLayout}>
            <AdminMenu />
            {props.children}
        </div>
        </>
    )
}