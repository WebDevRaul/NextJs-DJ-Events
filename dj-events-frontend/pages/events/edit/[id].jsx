import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { API_URL } from '@/config/index';

import { FaImage } from 'react-icons/fa';
import Layout from "@/layout/Layout";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css';

const EditEvent = (event) => {
  const [state, setState] = useState({ name: event.name, performers: event.performers, venue: event.venue, address: event.address, date: event.date, time: event.time, description: event.description });
  const [image, setImage] = useState(event.image ? event.image.formats.thumbnail.url : null);

  const { name, performers, venue, address, date, time, description } = state;
  const { push } = useRouter();

  const onChange = ({ target: { name, value }}) => setState({ ...state, [name]: value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(state).some(el => el === '');
    if(isEmpty) return toast.error('Please fill all the fields!');

    const res = await fetch(`${API_URL}/events/${event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });

    if(!res.ok) return toast.error('Something went wrong!');

    const evt = await res.json();
    push(`/events/${evt.slug}`);
  };

  return (
    <Layout title='Edit Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={onSubmit} className={styles.form} noValidate>
        <div className={styles.grid}>
            <div>
              <label htmlFor='name'>Event Name</label>
              <input type='text' name='name' id='name' value={name} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='performers'>Performers</label>
              <input type='text' name='performers' id='performers' value={performers} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='venue'>Venue</label>
              <input type='text' name='venue' id='venue' value={venue} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input type='text' name='address' id='address' value={address} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='date'>Date</label>
              <input type='date' name='date' id='date' value={moment(date).format('yyyy-MM-DD')} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='time'>Time</label>
              <input type='text' name='time' id='time' value={time} onChange={onChange} />
            </div>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea type='text' name='description' id='description' value={description} onChange={onChange} />
        </div>
        <input type='submit' value='Update Event' className='btn' />
      </form>
      <h2>Event Image</h2>
      { image && <Image src={image} height={100} width={170} /> }
      { !image && <div><p>No Image uploaded</p></div> }
      <div><button className="btn-secondary"><FaImage /> Set Image</button></div>
    </Layout>
  )
};

export async function getServerSideProps({ params: { id } }) {
  const evt = await( await fetch(`${API_URL}/events/${id}`)).json();

  return {
    props: { ...evt }
  }
} 

export default EditEvent;