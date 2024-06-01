import LeftSidebar from "../components/LeftSidebar"
import PlayMusicFooter from "../components/PlayMusicFooter"
import RightSidebar from "../components/RightSidebar"

function Layout({ children }) {
  return (
    <>
      <div className="w-full">
        <div className="flex">
          <LeftSidebar></LeftSidebar>
          {children}
          <RightSidebar></RightSidebar>
          <PlayMusicFooter></PlayMusicFooter>
        </div>
      </div>
    </>
  )
}

export default Layout