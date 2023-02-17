import Head from "next/head"
import useApi from "@/hooks/useApi"
import Image from "next/image"
import { useState, useEffect } from "react"

function getProgressNumber(progress) {
  return Number(progress.replace("%", ""))
}

function getTopStudent(data) {
  let topStudents = []
  let topPoint = 0
  data.forEach((student) => {
    let currentProgress = student.progress.replace("%", "")
    if (currentProgress > topPoint) {
      topPoint = currentProgress
    }
  })
  data.forEach((student) => {
    let currentProgress = student.progress.replace("%", "")
    if (currentProgress === topPoint) {
      topStudents.push(student)
    }
  })

  return topStudents
}

export default function Home() {
  let { data, isLoading, isError } = useApi("/api/cohort")
  const [topStudents, setTopStudents] = useState([])
  const [topStudentProgress, setTopStudentProgress] = useState(0)

  useEffect(() => {
    setTopStudents(getTopStudent(data))

    return () => {
      setTopStudents([])
    }
  }, [data])

  useEffect(() => {
    if (topStudents.length === 0) return
    setTopStudentProgress(getProgressNumber(topStudents[0].progress))

    return () => {
      setTopStudentProgress(0)
    }
  }, [topStudents])

  if (isError) {
    return <div>Oops, Error harap muat ulang halaman ...</div>
  }

  if (!isLoading && data && !isError) {
    return (
      <div>
        <Head>
          <title>BOOTCAMP - LEADERBOARDS</title>
        </Head>

        <main>
          <div className="container flex-center">
            <h1>BOOTCAMP LEADERBOARDS</h1>

            <div className="top-students flex-center">
              <div>
                <Image
                  src="/images/gold.png"
                  alt="gold"
                  width="200"
                  height="200"
                />
              </div>
              {topStudents.map((student, idx) => {
                return (
                  <div key={idx}>
                    <h3 className="top-student">{student.name}</h3>
                  </div>
                )
              })}
            </div>
            <h2 className="cohort-progress">All Progress</h2>
            <div className="container cohort-data">
              {data.map((student) => {
                return (
                  <div className="card" key={student.name}>
                    <div className="card-content">
                      <p className="card-content-name">{student.name}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          columnGap: "35px",
                        }}
                      >
                        {topStudents.map((topStudent, idx) => {
                          if (topStudent.name === student.name) {
                            return (
                              <div key={topStudent.name + idx}>
                                <p className="card-content-diff-progress">
                                  {student.progress}
                                </p>
                              </div>
                            )
                          } else {
                            return getProgressNumber(student.progress) >=
                              topStudentProgress / 2 ? (
                              <div>
                                <p className="card-content-diff-progress going">
                                  {student.progress}
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p className="card-content-diff-progress lag">
                                  {student.progress}
                                </p>
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="center-screen">
      <Head>
        <title>BOOTCAMP - LEADERBOARDS</title>
      </Head>
      <div className="lds-ring centered">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
