import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";
type Tag =  "h1" | "p" | "img" | "code";
type ButtonWithMenuProps = {
    handleAdd: (tag: Tag) => void
  }
  
  const ButtonWithMenu = ({ handleAdd }: ButtonWithMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  
    const toggleMenu = () => {
      setIsMenuOpen(prev => !prev);
  
    };
  
    type MenuItem = {
      key: number,
      name: "Heading" | "Paragraph" | "Code" | "Image",
      tag: Tag
    }
    const menuItems: MenuItem[] = [
      {
        key: 1,
        name: "Heading",
        tag: "h1"
      },
      {
        key: 2,
        name: "Paragraph",
        tag: "p"
  
      },
      {
        key: 3,
        name: "Image",
        tag: "img"
      },
      {
        key: 4,
        name: "Code",
        tag: "code"
      }
    ]
  
  
  
    return (
      <div className="mt-5" >
        <button onClick={toggleMenu} className="hover:rotate-45 duration-100">
          <PiPlusBold />
        </button>
        {isMenuOpen && (
          <ul className="flex flex-col gap-1 w-max p-1">
            {
              menuItems.map(item => <li key={item.key} className=" cursor-pointer  bg-white/10 rounded-sm p-1 " onClick={() => {
                handleAdd(item.tag)
                setIsMenuOpen(false)
              }}>{item.name}</li>)
            }
          </ul>
        )}
      </div>
    );
  };

  export default ButtonWithMenu;