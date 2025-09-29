import React from 'react'
import PropTypes from 'prop-types'
import { timeTables } from '../../lib/constants';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import "@react-pdf-viewer/core/lib/styles/index.css";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.js?url";

const TimeTables = () => {
   
  return (
    <section className="max-w-7xl mx-auto py-12 pb-4 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
        College Timetables
      </h2>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto text-sm">
        Get to know your class schedules and stay organized.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {timeTables.map((timetable, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="w-58 h-64">
              <Worker workerUrl={workerUrl}>
                <Viewer
                  fileUrl={timetable.link}
                  defaultScale={0.2}
                  initialPage={0}
                  scrollMode="page"
                />
              </Worker>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-green-700 mb-4 text-center">
                {timetable.title}
              </h3>
            </div>
            <div className="flex space-x-2 justify-center">
              {/* Open in new tab */}
              <button
                onClick={() => window.open(timetable.link, "_blank")}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Open
              </button>

              {/* Download */}
              <a
                href={timetable.link}
                download
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

TimeTables.propTypes = {}

export default TimeTables