"use client";

import dynamic from "next/dynamic";
import { global } from "@/app/styles/preset.css";
const PieChart = dynamic(() => import("@toast-ui/react-chart").then((lib) => lib.PieChart), { ssr: false });

export default function Chart( props: { data : { name: string, data: number }[] } ) {
    return (
        <PieChart data = {{
            categories: ['스탬프 이벤트'],
            series: props.data
        }} options={{
            usageStatistics: false,
            chart: { width: 400, height: 400 },
            exportMenu: {
                visible: false
            },
            legend: {
                align: "bottom"
            },
            theme: {
                chart: {
                    fontFamily: "SUITE Variable",
                    backgroundColor: global.bg.primary10
                }
            }
        }} />    
    )
}