'use client'
import { createContext, useContext, useEffect, useState } from "react";
const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(()=>{
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist])

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if(exists){
        setWishlist(prev => prev.filter((item)=> item._id !== product._id));

    }else{
        setWishlist(prev => [...prev, product]);

    }
  }
  return(
    <WishlistContext.Provider value={{wishlist, toggleWishlist}}>
        {children}
    </WishlistContext.Provider>
  )
};

export const useWishlist = () => useContext(WishlistContext);
