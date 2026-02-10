import React from "react";
import styled from "styled-components";

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
    return (
        <StyledWrapper>
            <div>
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <label htmlFor="checkbox" className="toggle">
                    <div className="bars" id="bar1" />
                    <div className="bars" id="bar2" />
                    <div className="bars" id="bar3" />
                </label>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition-duration: 0.5s;
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 4px;
  }

  #bar2 {
    transition-duration: 0.8s;
  }

  #bar1,
  #bar3 {
    width: 70%;
  }

  #checkbox:checked + .toggle .bars {
    position: absolute;
    transition-duration: 0.5s;
  }

  #checkbox:checked + .toggle #bar2 {
    transform: scaleX(0);
  }

  #checkbox:checked + .toggle #bar1 {
    width: 100%;
    transform: rotate(45deg);
  }

  #checkbox:checked + .toggle #bar3 {
    width: 100%;
    transform: rotate(-45deg);
  }

  #checkbox:checked + .toggle {
    transform: rotate(180deg);
  }
`;

export default Switch;
