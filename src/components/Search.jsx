import { Form } from "react-bootstrap";

const Search = () => {
  return (
    <Form>
      <Form.Group className="form-label">
        <Form.Control type="text" placeholder="Search Location.." />
      </Form.Group>
    </Form>
  );
};
export default Search;
