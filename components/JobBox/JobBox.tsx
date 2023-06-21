import Link from "next/link";

const JobBox = (props:any)   => {

    return (
        <>
           
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4 text-capitalize">{props?.data?.title}</h5>
                        <h6 className="card-subtitle mb-3 text-dark"><u>Posted By-</u><span className="text-muted ms-2 text-capitalize">{props?.data?.company?.name}</span></h6>
                        <h6 className="card-subtitle mb-3 text-dark"><u>Salary-</u><span className="text-muted ms-2">{props?.data?.salary?.salary} </span></h6>
                        <div className="card-text text-justify" dangerouslySetInnerHTML={{__html:props?.data?.description?.substring(0,300) + "....."}}/>

                        <h6 className="card-subtitle my-3 text-dark"><u>Location-</u><span className="text-muted ms-2">{props?.data?.city + " , " + props?.data?.state}</span></h6>
                        <h6 className="card-subtitle mb-3 text-dark"><u>Job Type-</u><span className="text-muted ms-2">Full Time</span></h6>
  
                    </div>
               

        </>
    )
}


export default JobBox;