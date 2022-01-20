import packageJson from "../package.json"
import "./Version.css"

const Version = () => {
  return (
    <span className="version">version: {packageJson.version}</span>
  )
}

export default Version
