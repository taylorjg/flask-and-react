import styled from "@emotion/styled"
import packageJson from "../package.json"

const StyledVersion = styled.div`
  font-style: italic;
  font-size: smaller;
  position: fixed;
  bottom: .5rem;
  right: .5rem;
`

const Version = () => {
  return (
    <StyledVersion>version: {packageJson.version}</StyledVersion>
  )
}

export default Version
