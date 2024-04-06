// eslint-disable-next-line react/prop-types
export const WeatherCard = ({ title, data }) => {
  return (
    <div className="weather-card">
      <p>{title}</p>
      <span>{data}</span>
    </div>
  );
};
