"use client";
import React from 'react';
import clsx from 'clsx';

const Card = ({ children, className, padding = "p-6" }) => {
  return (
    <div className={clsx(
      "rounded-2xl bg-white shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700",
      padding,
      className
    )}>
      {children}
    </div>
  );
};

export default Card;
