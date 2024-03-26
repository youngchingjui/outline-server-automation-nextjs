"use client"

import { useState } from "react"

import Button from "./button"

export default function StatusWindow() {
    const [status, setStatus] = useState("Ready to start")
    return (
        <div>
            <label>Status:</label>
            <div>{status}</div>
            <Button setStatus={setStatus}>Restart Outline server</Button>
        </div>
    )
}
