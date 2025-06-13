const sendLogToBackend = async (log, level = 'info') => {
  try {
    await fetch('/api/frontend-log/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ log, level }),
    });
  } catch (error) {
    console.error('Failed to send log to backend:', error);
  }
};

const logger = {
  info: (msg) => {
    console.info(msg);
    sendLogToBackend(msg, 'info');
  },
  warn: (msg) => {
    console.warn(msg);
    sendLogToBackend(msg, 'warning');
  },
  error: (msg) => {
    console.error(msg);
    sendLogToBackend(msg, 'error');
  },
  debug: (msg) => {
    console.debug(msg);
    sendLogToBackend(msg, 'debug');
  },
};

export default logger;
