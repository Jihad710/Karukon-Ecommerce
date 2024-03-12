import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Typography, Box, MenuItem } from '@mui/material';



const districts = [
"Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur", 
  "Chapainawabganj", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", 
  "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", 
  "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", 
  "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", 
  "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", 
  "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", 
  "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", 
  "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];


function Order() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedDistrict, setSelectedDistrict] = useState('');  
   const [isChecked, setIsChecked] = useState(false);
   const [bkashChecked, setBkashChecked] = useState(false);
   const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });


   const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
};
const handleCheckboxBkash = () => {
  setBkashChecked(!bkashChecked);
};

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data); // You can handle the form data submission here
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Box  mt={10}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ overflow: 'auto' }}>

 
    <Grid container spacing={20} style={{  marginTop: '20px' }}>

        {/* Left side: fields */}
        <Grid item xs={12} md={6}>
          <Box mb={3}>
            <Typography variant="h5" gutterBottom>
              Name *
            </Typography>
            <TextField
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ style: { fontSize: 25 } }} // Enlarge placeholder text size
              inputProps={{ style: { fontSize: 25 } }} // Enlarge input text size
            />
          </Box>
          <Box mb={3}>
  <Typography variant="h5" gutterBottom>
    Country / Region
  </Typography>
  <TextField
    {...register("country", { required: "Country / Region is required" })}
    defaultValue="Bangladesh"
    placeholder="Enter your country / region"
    fullWidth
    error={!!errors.country}
    helperText={errors.country?.message}
    InputProps={{
      style: {
        fontSize: 25,
        background: 'rgba(0, 0, 0, 0.05)',
        padding: '4px',
      },
      readOnly: true, // Make the field read-only instead of disabled
    }}
  />
</Box>

          <Box mb={3}>
            <Typography variant="h5" gutterBottom>
              Street Address *
            </Typography>
            <TextField
              {...register("streetAddress", { required: "Street address is required" })}
              placeholder="Enter your street address"
              fullWidth
              error={!!errors.streetAddress}
              helperText={errors.streetAddress?.message}
              InputLabelProps={{ style: { fontSize: 25 } }} // Enlarge placeholder text size
              inputProps={{ style: { fontSize: 25 } }} // Enlarge input text size
            />
          </Box>
          <Box mb={3}>
            <Typography variant="h5" gutterBottom>
              House Number (Optional)
            </Typography>
            <TextField
              {...register("houseNumber", { required: "Street address is required" })}
              placeholder="Enter your street address and House number"
              fullWidth
              error={!!errors.houseNumber}
              helperText={errors.houseNumber?.message}
              InputLabelProps={{ style: { fontSize: 25 } }} // Enlarge placeholder text size
              inputProps={{ style: { fontSize: 25 } }} // Enlarge input text size
            />
          </Box>
          <Box mb={3}>
            <Typography variant="h5" gutterBottom>
              Town / City *
            </Typography>
            <TextField
              {...register("townCity", { required: "Town / City is required" })}
              placeholder="Enter your town / city"
              fullWidth
              error={!!errors.townCity}
              helperText={errors.townCity?.message}
              InputLabelProps={{ style: { fontSize: 25 } }} // Enlarge placeholder text size
              inputProps={{ style: { fontSize: 25 } }} // Enlarge input text size
            />
          </Box>
          <Box mb={3}>
            <Typography variant="h5" gutterBottom>
              District *
            </Typography>
            <TextField
              select
              {...register("district", { required: "District is required" })}
              placeholder="Select your district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              fullWidth
              error={!!errors.district}
              helperText={errors.district?.message}
              InputLabelProps={{
                style: { fontSize: 25 }, // Enlarge placeholder text size
                shrink: true // Ensure the label doesn't overlap with the placeholder
              }}
              inputProps={{
                style: { fontSize: 25 }, // Enlarge input text size
              }}
              InputProps={{
                style: { fontSize: 25 }, // Enlarge input text size
                disableUnderline: true // Hide the default underline
              }}
              
            >
              {districts.map((district, index) => (
                <MenuItem key={index} value={district === "Please Select A District" ? "" : district}>
                  {district}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mb={3}>
            <Typography variant="h5" gutterBottom>
              Phone Number *
            </Typography>
            <TextField
              {...register("phone", { required: "Phone is required" })}
              placeholder="Enter your phone number"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputLabelProps={{ style: { fontSize: 25 } }} // Enlarge placeholder text size
              inputProps={{ style: { fontSize: 25 } }} // Enlarge input text size
            />
          </Box>
          <Box mb={3}>
            <Typography variant="h5" gutterBottom>
              Email*
            </Typography>
            <TextField
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              placeholder="Enter your email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ style: { fontSize: 25 } }} // Enlarge placeholder text size
              inputProps={{ style: { fontSize: 25 } }} // Enlarge input text size
            />
          </Box>
          <Box mb={3}>
            <Typography variant="h5" gutterBottom>
              Order Notes (Optional)
            </Typography>
            <TextField
              {...register("orderNotes")}
              placeholder="Enter any order notes (optional)"
              fullWidth
              multiline
              rows={4}
              InputLabelProps={{ style: { fontSize: 25 } }} // Enlarge placeholder text size
              inputProps={{ style: { fontSize: 25 } }} // Enlarge input text size
            />
          </Box>
        </Grid>

        {/* Right side: title and description */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
              YOUR ORDER
          </Typography>
          <hr />
          <Typography variant="h6" paragraph>
     
Yellow & Orange Color Glass 
Design Mosaic Turkish Jug Style Table Lamp <br/>
1 × ৳2,690.00 <br/>
Subtotal: ৳2,690.00

          </Typography>
          <hr/>
          <Typography variant="h4" gutterBottom style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span style={{ fontWeight: '400' }}>Subtotal</span>
    <span style={{ fontWeight: '400' }}>৳2,690.00</span>
</Typography>
<hr></hr>
<div style={{ display: 'inline-block', position: 'relative' }}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{ position: 'absolute', opacity: 0, cursor: 'pointer' }}
                id="checkbox"
            />
            <label htmlFor="checkbox" style={{ cursor: 'pointer', userSelect: 'none' }}>
                <div
                    style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '3px solid #000',
                        display: 'inline-block',
                        marginRight: '15px',
                        background: isChecked ? '#005CC8' : 'transparent'
                    }}
                ></div>
                <span style={{ fontSize: '30px' }}>Cash on delivery</span>
                
            </label>
            
        </div>
        <h4>Pay with cash upon delivery. Outside Dhaka customer have to pay <br/> delivery charge in advance.</h4>
        <div style={{ display: 'inline-block', position: 'relative', marginTop: '40px' }}>
              <input
                type="checkbox"
                checked={bkashChecked}
                onChange={handleCheckboxBkash}
                style={{ position: 'absolute', opacity: 0, cursor: 'pointer' }}
                id="bkashCheckbox"
              />
              <label htmlFor="bkashCheckbox" style={{ cursor: 'pointer', userSelect: 'none' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '3px solid #000',
                    display: 'inline-block',
                    marginRight: '15px',
                    background: bkashChecked ? '#005CC8' : 'transparent'
                  }}
                ></div>
                <span style={{ fontSize: '30px' }}>bKash</span>
                <h4>Pay with bKash Payment Gateway.</h4>
              </label>
              <h3 style={{ color: 'black', marginTop: '15px' }}>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</h3>
            </div>
        <div style={{ display: 'inline-block', position: 'relative', marginTop: '40px' }}>
            <input
                type="checkbox"
                checked={isChecked}
                
                style={{ position: 'absolute', opacity: 0, cursor: 'pointer' }}
                id="checkbox"
            />
            <label htmlFor="checkbox" style={{ cursor: 'pointer', userSelect: 'none' }}>
                <div
                    style={{
                        width: '20px',
                        height: '20px',
                     
                        border: '3px solid #000',
                        display: 'inline-block',
                        marginRight: '15px',
                        background: isChecked ? '' : 'transparent'
                    }}
                ></div>
                <span style={{ fontSize: '20px' }}>I have read and agree to the website terms & policy , privacy policy , return, refund & replacement policy  *</span>
              
            </label>
        </div>

        </Grid>
      </Grid>

      </div>
    </form>
     </Box>
  );
}

export default Order;
