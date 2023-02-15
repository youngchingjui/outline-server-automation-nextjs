const handle = async (req, res) => {
  if (req.method === "POST") {
    // Create AWS Lightsail instance
    const instance = await createInstance()
    res.status(200).json({ message: "OK" })
  } else {
    res.status(400).json({ message: "Bad request" })
  }
}

export default handle
