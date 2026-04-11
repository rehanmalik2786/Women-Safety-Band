/* ============================================
   WOMEN SAFETY BAND — Main App
   Global state + screen routing
   ============================================ */

function App() {
  // ── Navigation ──
  const [screen, setScreen] = useState('splash');

  // ── Emergency ──
  const [emergency, setEmergency] = useState(false);
  const [timer,     setTimer]     = useState(0);
  const [alertSent, setAlertSent] = useState(false);

  // ── GPS ──
  const [lat, setLat] = useState(26.9124);
  const [lng, setLng] = useState(75.7873);

  // ── Device status ──
  const [battery] = useState(87);
  const [signal]  = useState(4);

  // ── Data ──
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [history,  setHistory]  = useState(INITIAL_HISTORY);

  // ── Settings ──
  const [speechLang, setSpeechLang] = useState('en'); // 'en' | 'hi'

  const timerRef = useRef();

  // ── Splash auto-redirect ──
  useEffect(() => {
    const splashTimer = setTimeout(() => setScreen('login'), 1800);
    return () => clearTimeout(splashTimer);
  }, []);

  // ── Emergency timer + GPS drift ──
  useEffect(() => {
    if (emergency) {
      timerRef.current = setInterval(() => {
        setTimer(t => t + 1);
        setLat(v => v + (Math.random() - 0.5) * 0.0002);
        setLng(v => v + (Math.random() - 0.5) * 0.0002);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setTimer(0);
    }
    return () => clearInterval(timerRef.current);
  }, [emergency]);

  // ── Trigger SOS ──
  // Called after 3rd tap on panic button
  const triggerPanic = () => {
    setEmergency(true);
    setAlertSent(false);
    setTimeout(() => setAlertSent(true), 1200);
    setScreen('emergency');
    // Speech starts inside EmergencyScreen via useEffect
  };

  // ── End Emergency ──
  const endEmergency = () => {
    stopSpeech();
    const rec = {
      id:       Date.now(),
      ts:       new Date().toLocaleString('en-IN').slice(0, 16),
      lat, lng,
      status:   'resolved',
      duration: fmtTimer(timer),
      loc:      'Jaipur, Rajasthan',
    };
    setHistory(h => [rec, ...h]);
    setEmergency(false);
    setAlertSent(false);
    setScreen('home');
  };

  // ── Screen routing ──
  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return h(SplashScreen, {});

      case 'login':
        return h(LoginScreen, { setScreen });

      case 'home':
        return h(HomeScreen, { screen, setScreen, triggerPanic, battery, signal });

      case 'emergency':
        return h(EmergencyScreen, { timer, lat, lng, alertSent, contacts, endEmergency, speechLang });

      case 'contacts':
        return h(ContactsScreen, { screen, setScreen, contacts, setContacts });

      case 'history':
        return h(HistoryScreen, { screen, setScreen, history });

      case 'dashboard':
        return h(DashboardScreen, { screen, setScreen, history, contacts, lat, lng });

      case 'settings':
        return h(SettingsScreen, { screen, setScreen, speechLang, setSpeechLang });

      default:
        return h(HomeScreen, { screen, setScreen, triggerPanic, battery, signal });
    }
  };

  return h('div', {
    style: { maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: 'var(--bg)', position: 'relative' }
  }, renderScreen());
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
