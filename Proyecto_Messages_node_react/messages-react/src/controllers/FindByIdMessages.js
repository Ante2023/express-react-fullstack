import React,{useState,useEffect} from 'react'

const FindByIdMessages = (props) => {
  const [message,setMessage] = useState(undefined)
	useEffect(()=>{
    const requestOptions = {
      method: "GET",
      // headers: {
      //     'Authorization': 'Bearer my-token',
      //     'My-Custom-Header': 'foobar'
      // }
    };
		fetch(`http://localhost:3001/messages/find-id?id=${props.id}`,requestOptions)
		.then(res => res.json())
		.then(data=>props.setUpdateOldMsg(data[0]))
	},[props.id])
  return (
	<></>
  )
}

export default FindByIdMessages
