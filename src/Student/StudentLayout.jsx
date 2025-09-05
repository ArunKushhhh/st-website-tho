import StudentApp from './StudentApp'
import StudentBeast from './StudentBeast'
import StudentCare from './StudentCare'
import StudentEvents from './StudentEvents'
import StudentIntroPage from './StudentIntroPage'
import StudentOpportunities from './StudentOpportunities'
import StudentSchool from "./StudentSchool"
import WhoweAre from './WhoWeAre'

function StudentLayout() {
  return (
    <>
        <StudentIntroPage/>
        <StudentSchool/>
        <StudentApp/>
        <StudentOpportunities/>
        <StudentEvents/>
        <StudentBeast/>
        <StudentCare/>
        <WhoweAre/>
    </>
  )
}

export default StudentLayout