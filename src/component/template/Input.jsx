import React from 'react';
const Input = ({ name, label, error, onChange, value, type}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input name={name} onChange={onChange} value={value} type={type} className="form-control" id={name} aria-describedby="textHelp" placeholder={`Input ${name}`} />
            {/* <small id="textHelp" className="form-text text-muted">We'll never share your username with anyone else.</small> */}
            
            
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;