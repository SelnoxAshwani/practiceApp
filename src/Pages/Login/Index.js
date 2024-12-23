import React, { useState } from 'react';
import axios from 'axios'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }
        setError('');
            axios.post('http://localhost:6001/auth/login' , {
              email, 
              password 
            }).then((res)=>{
                alert('login Successful!');
                // navigator('/login')
            })
        console.log('Logging in with', { email, password });
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>{'Login'}</h2>
                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="email">{'Email'}</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="password">{'Password'}</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
}

// Inline styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
     
        backgroundColor: '#f7f7f7',
    },
    form: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        textAlign: 'center',
        color: '#333',
    },
    inputGroup: {
        marginBottom: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        color: 'red',
        fontSize: '0.875rem',
        marginBottom: '1rem',
        textAlign: 'center',
    },
};

export default Login;
