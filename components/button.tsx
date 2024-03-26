"use client"

export default function Button({ setStatus, children }) {
    const handleClick = async () => {
        try {
            const response = await fetch("/api/restart", {
                method: "POST",
            })

            if (!response.ok) throw new Error(response.statusText)

            const result = await response.json()

            setStatus(JSON.stringify(result))
            console.log("Result:", result)
        } catch (error) {
            console.error("An error occurred:", error)
        }
    }
    return <button onClick={handleClick}>{children}</button>
}
