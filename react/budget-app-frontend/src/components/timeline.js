import "./timeline.css";

export default function Timeline ({timeline_data}){
  // console.log(Object.keys(timeline_data),timeline_data);
  return (
    <div className="timeline">
      
      
      {Object.keys(timeline_data).map((el,idx)=>
        <div key={`TL-header-${idx}`}>
          <header className="timeline-header">
            <span className="tag is-medium is-link">{el}</span>
          </header>
          {timeline_data[el].map((subEl,subIdx)=>
            <div key={`TL-content-${idx}-${subIdx}`} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content" style={{width:"100%"}}>
                <p className="heading">{subEl.category}</p>
                <div>{subEl}</div>
              </div>
            </div>
          )}
        </div>
      )}
      <div key="TL-timeline-end" className="timeline-header">
        <span className="tag is-medium is-link">End</span>
      </div>
    </div>
  )
}


