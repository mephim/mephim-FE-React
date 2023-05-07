function Transaction() {
    return <div className='transaction-success-page'>
        <div className='card'>
            <div style={{ borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto' }}>
                <i className='checkmark'>✓</i>
            </div>
            <h1>Success</h1>
            <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
        </div>
    </div>;
}

export default Transaction;
