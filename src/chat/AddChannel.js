import React, { useState, useEffect} from 'react';
import { MdAddBox } from "react-icons/md";
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default function  AddChannel(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {axios.post(`http://localhost:8080/addChannel`,{data})
    .then(res => {
      setTimeout(props.onClose(),10000);
      console.log(res.data);
    })}

return(<div>
    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)}>
       {/* include validation with required or other standard HTML validation rules */}
      <input placeholder="channel name" name="exampleRequired" ref={register({ required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <Button variant="primary" type = "submit" className="" 
        ><MdAddBox size={22}/> Channel</Button>
    </form>
</div>)
}
