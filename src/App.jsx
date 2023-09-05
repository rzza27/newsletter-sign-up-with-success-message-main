/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function App() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [email, setEmail] = useState('');

  // Function to show the success message and hide the form
  const showSuccess = (email) => {
    setEmail(email); // Set the email in App component state
    setShowSuccessMessage(true);
  };

  const dismissSuccessMessage = () => {
    setEmail(''); // Reset the email
    setShowSuccessMessage(false); // Hide the success message
  };

  return (
    <div>
      {showSuccessMessage ? (
        <div className='bg-white  rounded-2xl w-[420px] h-auto '>
          <SuccessMessage email={email}  onDismiss={dismissSuccessMessage}/> {/* Pass the email to SuccessMessage */}
        </div>
      ) : (
        <div className='flex flex-col md:gap-4 md:flex-row-reverse md:p-8 justify-center items-center md:h-auto md:w-[800px] bg-white mx-auto border rounded-2xl'>
          <Image />
          <Content showSuccess={showSuccess} />
        </div>
      )}
    </div>
  );
}

function Image() {
  return (
    <div className=''>
      <img
        src='/assets/illustration-sign-up-mobile.svg'
        alt='Illustration'
        className='w-full md:hidden'
      />
      <img
        src='/assets/illustration-sign-up-desktop.svg'
        alt='Illustration'
        className='md:block hidden w-full'
      />
    </div>
  );
}

function Content({ showSuccess }) {
  return (
    <div className='flex flex-col py-8 px-4 space-y-2  '>
      <h1 className='text-4xl font-bold'>Stay Updated!</h1>
      <p>Join 60,000+ product managers receiving monthly updates on:</p>

      <div className='flex gap-3'>
        <img src='/assets/icon-list.svg' alt='icon' />
        <span>Product discovery and building what matters</span>
      </div>
      <div className='flex gap-3'>
        <img src='/assets/icon-list.svg' alt='icon' />
        <span>Measuring to ensure updates are a success</span>
      </div>
      <div className='flex gap-3'>
        <img src='/assets/icon-list.svg' alt='icon' />
        <span>And much more!</span>
      </div>
      <SubscribeForm showSuccess={showSuccess} />
    </div>
  );
}

function SubscribeForm({ showSuccess }) {
  const [email, setEmailLocal] = useState(''); // Local state for the input
  const [error, setError] = useState(null);

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError('Valid email required');
    } else {
      setError(null);
      setEmailLocal(email); // Update the email state in the App component
      setEmailLocal(''); // Reset the local email state

      // Show the success message
      showSuccess(email);
    }
  };

  return (
    <div>
      <form className='mt-4 flex flex-col' onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <label className='text-left font-bold'>Email Address</label>
          {error && email ? <p className='text-tomato'>{error}</p> : null}
        </div>
        <input
          type='text'
          placeholder='email@company.com'
          className={`border-2 p-4 rounded-lg ${
            error && email ? 'text-tomato border-tomato bg-[#FFE8E6]' : ''
          }`}
          value={email}
          onChange={(e) => {
            setEmailLocal(e.target.value); // Update local state
          }}
          formNoValidate
        />

        <button className='bg-darkSlateGrey text-white mt-4 p-4 rounded-lg transition-all hover:bg-tomato orangeShadow'>
          Subscribe to monthly newsletter
        </button>
      </form>
    </div>
  );
}

function SuccessMessage({ email,onDismiss }) {
  return (
    <>
      <div className='space-y-6 grid place-content-center p-8 h-screen md:h-auto '>
        <img src='/assets/icon-success.svg' alt='' />
        <h1 className='text-3xl font-bold'>Thanks for subscribing!</h1>
        <p className='mb-12'>
          A confirmation email has been sent to{' '}
          <span className='font-bold'>{email}</span>. Please open it and click the
          button inside to confirm your subscription.
        </p>
        <div className='flex flex-col '>
          <button className=' bg-darkSlateGrey  text-white w-full p-4 rounded-lg  transition-all hover:bg-tomato ' onClick={onDismiss}>
            Dismiss message
          </button>
        </div>
      </div>
    </>
  );
}
