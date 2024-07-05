import { useState } from "react";
import { Form } from "react-bootstrap";

const Search = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(location);
    }
  };

  return (
    <Form className="d-flex justify-content-center">
      <Form.Group className="form-label">
        <Form.Control
          type="text"
          placeholder="Search Location.."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </Form.Group>
    </Form>
  );
};

export default Search;
