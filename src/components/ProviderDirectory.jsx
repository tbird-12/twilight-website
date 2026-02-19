import { useState, useMemo } from 'preact/hooks';
import providers from '../data/providers.json';
import "../styles/global.css";

export default function ProviderDirectory() {
  const [service, setService] = useState('');
  const [state, setState] = useState('');
  const [payType, setPayType] = useState('');
  const [showIns, setShowIns] = useState({});

  // Get unique options for filters
  const services = [...new Set(providers.flatMap(p => p.services_offered))].sort();
  const states = [...new Set(providers.flatMap(p => p.states_served))].sort();

  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      const matchService = !service || p.services_offered.includes(service);
      const matchState = !state || p.states_served.includes(state);
      const matchPay = !payType || p.wait_times[payType];
      return matchService && matchState && matchPay;
    });
  }, [service, state, payType]);

  const toggleIns = (idx) => {
    setShowIns(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="container">
      <div className="filter-panel">
        <div className="filter-group">
          <label>Service</label>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">All Services</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        
        <div className="filter-group">
          <label>State</label>
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">All States</option>
            {states.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Wait Type</label>
          <select value={payType} onChange={(e) => setPayType(e.target.value)}>
            <option value="">Any Wait Time</option>
            <option value="testing_insurance">Insurance Testing</option>
            <option value="testing_out_of_pocket">Out of Pocket Testing</option>
            <option value="therapy">Therapy</option>
            <option value="medication_management">Medication Management</option>
          </select>
        </div>

        <button className="reset-btn" onClick={() => {setService(''); setState(''); setPayType('');}}>Reset</button>
      </div>

      <div className="provider-grid">
        {filteredProviders.map((p, idx) => (
          <div className={`card ${showIns[idx] ? 'show-ins' : ''}`} key={idx}>
            {!showIns[idx] ? (
              <div className="main-view">
                <div className="credential">{p.credential}</div>
                <h3>{p.name_with_education}</h3>
                <div className="section-title">States</div>
                <div className="tag-container">
                  {p.states_served.map(st => <span className="tag" key={st}>{st}</span>)}
                </div>
                <button className="ins-toggle-btn" onClick={() => toggleIns(idx)}>View Insurance →</button>
                <div className="wait-info">
                   <div className="section-title">Wait Times</div>
                   {Object.entries(p.wait_times).map(([k, v]) => (
                     <div className="wait-item" key={k}>
                       <span className="wait-label">{k.replace(/_/g, ' ')}</span>
                       <span className="wait-value">{v}</span>
                     </div>
                   ))}
                </div>
              </div>
            ) : (
              <div className="insurance-view">
                <h3>{p.name_with_education}</h3>
                <div className="section-title">Accepted Insurance</div>
                <div className="tag-container">
                  {p.ins.map(i => <span className="tag ins-tag" key={i}>{i}</span>)}
                </div>
                <button className="ins-toggle-btn" onClick={() => toggleIns(idx)}>← Back</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}