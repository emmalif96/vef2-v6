import PropTypes from 'prop-types';

import css from './Field.css';

export default function Field(props) {
  const { label, onChange, value, type } = props; 

  return (
    <div className={css.field}>
        <legend className={css.field__label}>{label} </legend>
      <input className={css.field__input} type={type} value={value} onChange={onChange} ></input>
    </div>
  );
}

Field.propTypes = {

}

Field.defaultProps = {

}
