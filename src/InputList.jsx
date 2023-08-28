import React, { useState } from 'react'

const InputList = () => {

      const [inputs, setInputs] = useState([]);
      const [newInput, setNewInput] = useState('');
    
      const handleInputChange = (event) => {
        setNewInput(event.target.value);
      };
    
      const handleAddInput = () => {
        if (newInput.trim() !== '') {
          setInputs([...inputs, newInput]);
          setNewInput('');
        }
      };
    
      const handleRemoveInput = (index) => {
        const updatedInputs = inputs.filter((_, i) => i !== index);
        setInputs(updatedInputs);
      };
    
      return (
        <div>
          <div>
            <input
              type="text"
              placeholder="Add input..."
              value={newInput}
              onChange={handleInputChange}
            />
            <button onClick={handleAddInput}>Add</button>
          </div>
          <ul>
            {inputs.map((input, index) => (
              <li key={index}>
                {input}
                <button onClick={() => handleRemoveInput(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default InputList;