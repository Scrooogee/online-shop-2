import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={279}
    height={472}
    viewBox="0 0 279 472"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="69" y="123" rx="0" ry="0" width="0" height="1" /> 
    <rect x="0" y="1" rx="15" ry="15" width="279" height="250" /> 
    <rect x="0" y="273" rx="7" ry="7" width="279" height="28" /> 
    <rect x="0" y="325" rx="8" ry="8" width="279" height="95" /> 
    <rect x="0" y="434" rx="12" ry="12" width="98" height="35" /> 
    <rect x="181" y="435" rx="17" ry="17" width="98" height="35" />
  </ContentLoader>
)

export default Skeleton;