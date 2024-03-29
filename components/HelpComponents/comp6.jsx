//customer profile
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { getData, postData } from '@/helpers/services';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation';
import style from "@/styles/moduleCSS/HelpComponentStyle/comp6.module.css";
import axios from 'axios';


const Comp6 = () => {

    const route = useRouter();

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    // const [alt_phone, setAlt_phone] = useState(0);
    // const [Hno, setHno] = useState(0);
    const [locality, setLocality] = useState('');
    // const [lankmark, setLandmark] = useState('');
    const [zip, setZip] = useState(0);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [userType, setUserType] = useState('');
    const [profile_photo, setProfile_photo] = useState('');
    const [current_photo, setCurrent_photo] = useState(null);
    const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
    const [refresh, setRefresh] = useState('');

    useEffect(() => {
        getUser();
    }, [refresh])

    const getUser = async () => {
        setisSubmitingLoader(true)
        try {
            if (typeof window !== 'undefined') {
                const user_id = localStorage.getItem("UserId[C]")
                // console.log("user_id", user_id)

                const resp = await getData(`/GetAllUser?id=${user_id}`)
                // resp.msg === 'No Data Found' ? toast.error("No user found..") : toast.success("Data Found..")
                
                setUserId(user_id);
                setName(resp?.data[0]?.name);
                setEmail(resp?.data[0]?.email);
                setPhone(resp?.data[0]?.user_phno);
                setCity(resp?.data[0]?.user_city);
                setCountry(resp?.data[0]?.user_country);
                setLocality(resp?.data[0]?.user_locality);
                setZip(resp?.data[0]?.user_zipcode);
                setState(resp?.data[0]?.user_state);
                setUserType(resp?.data[0]?.user_type);
                setCurrent_photo(resp?.data[0]?.user_profile_photo);
            }
        } catch (error) {
            console.log("try-catch error", error)
        }
        setisSubmitingLoader(false)
    }

    // console.log("userId", userId)
    // console.log("name", name)
    // console.log("phone", phone)
    // console.log("locality", locality)
    // console.log("zip", zip)
    // console.log("city", city)
    // console.log("state", state)
    // console.log("country", country)
    // console.log("profile_photo", profile_photo)


    const handleUpdate = async (e) => {
        e.preventDefault();
        // console.log("userId", userId)
        // console.log("name", name)
        // console.log("phone", phone)
        // console.log("locality", locality)
        // console.log("zip", zip)
        // console.log("city", city)
        // console.log("state", state)
        // console.log("country", country)
        // console.log("profile_photo", profile_photo)
        setisSubmitingLoader(true)
        // console.log("phone no", phone)
        // console.log("type of", typeof (phone))
        // console.log("phone.length", phone?.toString()?.length)

        if (phone == null) {
            toast.error("Phone number is required !")
        }
        else if (phone?.toString()?.length != 10) {
            toast.error("Phone number should be of 10 digits !")
        }
        else if (zip == null) {
            toast.error("Zip code is required !")
        }
        else if (zip?.toString()?.length != 6) {
            toast.error("Zip code should be of 6 digits !")
        }
        else if (locality == null) {
            toast.error("Address is required !")
        }
        else if (city == null) {
            toast.error("City is required !")
        }
        else if (state == null) {
            toast.error("State is required !")
        }
        else if (country == null) {
            toast.error("Country is required!")
        }
        else {
            try {
                if (typeof window !== 'undefined') {
                    // const user_id = localStorage.getItem("UserId[C]");
                    const formData = new FormData();
                    formData.append('updId', userId);
                    formData.append('name', name);
                    formData.append('user_phno', parseInt(phone));
                    formData.append('user_locality', locality);
                    // formData.append('user_house_num', Hno);
                    // formData.append('user_landmark', lankmark);
                    formData.append('user_zipcode', parseInt(zip));
                    formData.append('user_city', city);
                    formData.append('user_state', state);
                    formData.append('user_country', country);
                    formData.append('user_profile_photo', profile_photo);
                    formData.append('user_type', 'Customer');



                    const resp = await axios.post(process.env.NEXT_PUBLIC_SITE_URL + "/UpdateUser", formData)
                    // const resp = await postData("/UpdateUser", formData)

                    console.log("update user resp", resp)

                    resp?.data?.message === "User Updated Successfully" ? toast.success(resp?.data?.message) : toast.error(resp.data.message)

                    setRefresh(Math.random)
                }
            } catch (error) {
                console.log("try-catch error", error)
            }
        }



        setisSubmitingLoader(false)
    }

    const handleLogout = () => {
        setisSubmitingLoader(true)

        try {
            if (typeof window !== 'undefined') {
                // localStorage.removeItem("Etoken");
                // localStorage.removeItem("userName");
                // localStorage.removeItem("UserId[C]");
                localStorage.clear();
                setTimeout(() => route.push("/"), 1500)

            }
            toast.success("SignOut Successfully!!")
            // location.reload();

        } catch (error) {
            console.log("try-catch error", error)
        }
        setisSubmitingLoader(false);
    }

    return (
        <div >
            {isSubmitingLoader ? (
                <div className="overlay">
                    <div className="spinner-container">
                        <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
                    </div>
                </div>
            ) : null}
            <Toaster position="top-center" richColors />


            <div className={style.profilepic} >
                <Image src={current_photo === null || current_photo == undefined ? "/dummy.jpg" : process.env.NEXT_PUBLIC_IMAGE_URL + `${current_photo}`} height={200} width={200} alt='img' />
            </div>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} disabled />
                    </Form.Group>
                </Row>
                <Row className="mb-3">

                    <Form.Group as={Col} >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            type="file"
                            required
                            name="file"
                            onChange={(e) => setProfile_photo(e.target.files[0])}

                        />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>User Type</Form.Label>
                        <Form.Control type="text" value={userType} disabled />
                    </Form.Group>
                </Row>
                <Row className="mb-3">


                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text' value={locality} onChange={(e) => setLocality(e.target.value)} />

                    </Form.Group>

                </Row>


                <Row className="mb-3">
                    {/* <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>House No.</Form.Label>
                        <Form.Control type='text' value={Hno} onChange={(e) => setHno(e.target.value)} />
                    </Form.Group> */}

                    {/* <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Landmark</Form.Label>
                        <Form.Control type='text' value={lankmark} onChange={(e) => setLandmark(e.target.value)} />
                    </Form.Group> */}


                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>ZipCode</Form.Label>
                        <Form.Control type='number' value={zip} onChange={(e) => setZip(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control type='text' value={state} onChange={(e) => setState(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type='text' value={country} onChange={(e) => setCountry(e.target.value)} />
                    </Form.Group>
                </Row>


                <div className='d-flex justify-content-evenly'>

                    {(email == "" || userType == "") ? (<Button variant="primary" onClick={() => route.push("/login")} >
                        Login
                    </Button>) : (<Button variant="primary" type="submit" onClick={handleUpdate}>
                        Update
                    </Button>)}
                    {(email == "" || userType == "") ? (<Button variant="primary" onClick={handleLogout} disabled>
                        Sign Out
                    </Button>) : (<Button variant="primary" type="submit" onClick={handleLogout}>
                        Sign Out
                    </Button>)}
                </div>
            </Form>
        </div>

    );
}

export default Comp6;