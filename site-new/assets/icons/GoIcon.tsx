import * as React from "react";
import { SVGProps } from "react";
const GoIcon = ({
  height = 60,
  width = 44,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#F6D2A2"
        fillRule="evenodd"
        d="M1.095 32.238c.095 1.666 1.762.904 2.524.38.714-.523.952-.095 1-1.095.047-.666.095-1.285.095-1.952-1.095-.095-2.286.143-3.19.81-.43.333-1.334 1.428-.43 1.857Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="b"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#b)">
      <path
        fill="#000"
        d="M2 33.43c-.334 0-.953-.143-1.048-1.096-.286-.19-.381-.428-.381-.571-.048-.571.571-1.238.905-1.476.762-.572 1.762-.857 2.81-.857h.618v.143c.048.523 0 1.047-.047 1.523 0 .143 0 .286-.048.429-.048.714-.19.81-.524.952a1.448 1.448 0 0 0-.524.286c-.238.143-1.047.667-1.761.667Zm2.285-3.715c-1 0-1.905.286-2.619.81-.333.238-.81.81-.762 1.19 0 .143.096.286.286.381l.095.048v.095c.048.762.429.857.715.857.476 0 1.142-.333 1.571-.619.286-.19.476-.238.619-.285.238-.096.286-.096.333-.667 0-.143 0-.286.048-.429.048-.428.048-.904.048-1.333-.143-.048-.239-.048-.334-.048Z"
      />
    </g>
    <mask
      id="c"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#c)">
      <path
        fill="#C6B198"
        fillRule="evenodd"
        d="M1.096 32.236c.238-.095.524-.142.666-.38l-.666.38Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="d"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#d)">
      <path
        fill="#000"
        d="M1.095 32.382c-.047 0-.143-.048-.143-.096-.047-.095 0-.19.096-.19.047 0 .095-.048.095-.048.19-.095.38-.143.476-.285.048-.048.143-.096.238-.048.048.048.095.143.048.238-.19.238-.429.333-.62.381l-.095.048h-.095Z"
      />
    </g>
    <mask
      id="e"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#e)">
      <path
        fill="#6AD7E5"
        fillRule="evenodd"
        d="M5 12.094c-6.476-1.81-1.667-10.048 3.524-6.667L5 12.094Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="f"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#f)">
      <path
        fill="#000"
        d="m5.094 12.286-.143-.047c-3.333-.953-3.285-3.334-3.19-4.048.238-1.81 1.952-3.714 4.238-3.714.905 0 1.762.285 2.619.857l.143.095-3.667 6.857ZM6 4.81c-2.143 0-3.714 1.762-3.952 3.428-.239 1.715.81 3.048 2.857 3.667l3.38-6.428C7.57 5.048 6.809 4.81 6 4.81Z"
      />
    </g>
    <mask
      id="g"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#g)">
      <path
        fill="#6AD7E5"
        fillRule="evenodd"
        d="M33.713 4.808c5.095-3.571 9.762 4.524 3.81 6.572l-3.81-6.572Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="h"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#h)">
      <path
        fill="#000"
        d="m37.476 11.572-3.953-6.81.143-.095c.905-.619 1.81-.952 2.715-.952 2.19 0 3.761 1.81 4.095 3.571.143.715.285 3.143-2.857 4.19l-.143.096Zm-3.524-6.667 3.667 6.334c1.857-.667 2.81-2.096 2.523-3.81-.285-1.619-1.761-3.286-3.761-3.286-.81-.047-1.62.19-2.429.762Z"
      />
    </g>
    <mask
      id="i"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#i)">
      <path
        fill="#F6D2A2"
        fillRule="evenodd"
        d="M34.857 53c1.286.81 3.667 3.238 1.714 4.429-1.857 1.714-2.904-1.905-4.571-2.381.714-.953 1.619-1.858 2.857-2.048Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="j"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#j)">
      <path
        fill="#000"
        d="M35.572 58.046c-.762 0-1.429-.762-2-1.476-.524-.572-1.048-1.19-1.62-1.381l-.237-.048.143-.19c.571-.81 1.524-1.857 2.952-2.096h.048l.047.048c.81.524 2.572 2 2.524 3.381 0 .524-.286.952-.81 1.286-.333.333-.666.476-1.047.476Zm-3.333-3.095c.571.238 1.047.857 1.524 1.38.57.715 1.142 1.334 1.761 1.334.286 0 .572-.143.858-.429h.047c.429-.285.667-.619.667-1.047 0-1.095-1.381-2.476-2.333-3.095-.858.238-1.715.81-2.524 1.857Zm4.333 2.619c-.048 0-.095-.048-.143-.096a3.317 3.317 0 0 1-.238-.618c-.143-.382-.286-.762-.571-1.048-.048-.048-.048-.143 0-.238.047-.048.143-.048.238 0 .333.333.524.762.666 1.19l.239.572c.047.095 0 .19-.048.238h-.143Z"
      />
    </g>
    <mask
      id="k"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#k)">
      <path
        fill="#F6D2A2"
        fillRule="evenodd"
        d="M11.62 55.761c-1.524.238-2.38 1.62-3.667 2.333-1.19.715-1.666-.238-1.762-.428-.19-.095-.19.095-.476-.19-1.095-1.762 1.143-3.048 2.334-3.905 1.666-.381 2.714 1.047 3.571 2.19Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="l"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#l)">
      <path
        fill="#000"
        d="M7.143 58.479c-.62 0-.953-.524-1.048-.715h-.048c-.142 0-.238-.047-.428-.238v-.047c-1.048-1.667.762-2.953 1.952-3.81L8 53.384h.095c.19-.048.333-.048.524-.048 1.428 0 2.333 1.238 3.095 2.238l.238.333-.286.048c-.904.143-1.57.714-2.238 1.286a8.853 8.853 0 0 1-1.333 1c-.38.143-.667.238-.952.238Zm-1.048-1a.36.36 0 0 1 .19.047h.048l.048.048c.095.143.333.572.81.572.237 0 .476-.096.714-.239.476-.238.904-.619 1.285-.952.62-.524 1.286-1.095 2.143-1.333-.714-.953-1.571-2-2.762-2-.143 0-.285 0-.428.047l-.381.286c-1.238.857-2.762 1.952-1.857 3.38.047.096.095.144.19.144Zm.095.333c-.095 0-.19-.095-.143-.19.048-.477.286-.81.524-1.19.143-.191.238-.382.334-.572.047-.096.142-.096.19-.096.095.048.095.143.095.191-.095.238-.238.429-.38.619-.239.333-.43.62-.477 1 0 .19-.047.238-.143.238Z"
      />
    </g>
    <mask
      id="m"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#m)">
      <path
        fill="#000"
        fillRule="evenodd"
        d="M5.286 9.855c-.857-.429-1.476-1.048-.953-2.048.477-.904 1.381-.81 2.238-.38L5.286 9.854Zm30.905-.857c.857-.429 1.476-1.048.952-2.048-.476-.905-1.381-.81-2.238-.38l1.285 2.428Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="n"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#n)">
      <path
        fill="#F6D2A2"
        fillRule="evenodd"
        d="M42.047 32c-.095 1.666-1.762.904-2.524.38-.714-.524-.952-.095-1-1.095-.048-.667-.095-1.286-.095-1.952 1.095-.096 2.285.143 3.19.81.476.38 1.334 1.428.429 1.856Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="o"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#o)">
      <path
        fill="#000"
        d="M41.19 33.191c-.714 0-1.524-.523-1.762-.666-.238-.143-.38-.238-.524-.286-.38-.143-.476-.238-.523-.952 0-.143 0-.286-.048-.429-.048-.476-.095-1-.048-1.524v-.143h.62c1.047 0 2.047.286 2.809.858.333.238.952.904.905 1.476 0 .19-.096.428-.381.571-.096.953-.715 1.095-1.048 1.095Zm-2.619-3.666c0 .428 0 .905.048 1.333 0 .143 0 .286.047.429.048.571.096.571.334.666.142.048.333.143.619.286.428.286 1.095.62 1.571.62.286 0 .667-.096.714-.858v-.095l.096-.048c.19-.095.285-.19.285-.38.048-.382-.428-.953-.762-1.191-.714-.524-1.666-.81-2.619-.81-.095.048-.19.048-.333.048Z"
      />
    </g>
    <mask
      id="p"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#p)">
      <path
        fill="#C6B198"
        fillRule="evenodd"
        d="M42.047 32.002c-.238-.095-.523-.143-.666-.38l.666.38Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="q"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#q)">
      <path
        fill="#000"
        d="M42.047 32.19H42l-.096-.047c-.238-.096-.476-.143-.619-.381-.047-.048-.047-.19.048-.239.047-.047.19-.047.238.048.095.143.286.19.476.286.048 0 .095.047.095.047.096.048.143.143.096.19a.361.361 0 0 1-.19.096Z"
      />
    </g>
    <mask
      id="r"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#r)">
      <path
        fill="#6AD7E5"
        fillRule="evenodd"
        d="M20.952 1.43c6.476 0 12.524.904 15.714 7.143 2.858 6.952 1.81 14.476 2.286 21.857.381 6.333 1.19 13.619-1.714 19.476-3.096 6.143-10.81 7.714-17.143 7.476-5-.19-11-1.81-13.857-6.38-3.286-5.334-1.762-13.287-1.524-19.239.286-7.048-1.905-14.143.429-21 2.333-7.19 8.809-8.81 15.809-9.333Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="s"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#s)">
      <path
        fill="#000"
        d="M21.192 57.573H20c-1.952-.048-4.905-.381-7.81-1.572-2.809-1.143-4.857-2.762-6.19-4.905-2.667-4.333-2.19-10.285-1.762-15.571.095-1.333.19-2.572.238-3.762.095-2.476-.095-5.048-.333-7.476-.381-4.476-.762-9.095.714-13.571C6.001 7.382 8.048 5 11.144 3.477c2.428-1.19 5.429-1.857 9.714-2.19 6.381-.048 12.714.857 15.905 7.19 2.095 5.096 2.095 10.572 2.143 15.857 0 2 0 4.048.143 6.048.047.62.095 1.238.095 1.857.38 5.81.81 12.381-1.857 17.715-1.334 2.714-3.667 4.714-6.857 6-2.572 1.047-5.81 1.619-9.238 1.619Zm-.239-56c-6.714.523-13.285 2-15.714 9.238-1.476 4.428-1.095 9-.714 13.428.19 2.476.428 5 .333 7.524-.047 1.19-.143 2.429-.238 3.762-.428 5.238-.905 11.143 1.714 15.38 1.096 1.763 4.62 5.953 13.715 6.287h1.19c10.524 0 14.429-4.667 15.857-7.429 2.62-5.238 2.19-11.81 1.857-17.571a24.256 24.256 0 0 1-.095-1.858c-.095-2-.143-4.047-.143-6.047-.047-5.238-.047-10.714-2.095-15.762-1.428-2.81-3.571-4.714-6.524-5.81-3.047-1-6.476-1.142-9.143-1.142Z"
      />
    </g>
    <mask
      id="t"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#t)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M22.095 10.095c1.143 6.761 12.19 4.952 10.62-1.858-1.43-6.095-11-4.38-10.62 1.858Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="u"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#u)">
      <path
        fill="#000"
        d="M27.333 14.523c-2.143 0-4.857-1.143-5.428-4.381-.096-1.524.38-2.905 1.38-3.953 1.096-1.19 2.762-1.857 4.477-1.857 2 0 4.38 1.048 5.047 3.952.381 1.62.096 3.048-.81 4.19-1 1.239-2.761 2.049-4.666 2.049Zm-5.095-4.43c.238 1.334.857 2.382 1.857 3.144.857.666 2.048 1 3.238 1 1.762 0 3.476-.762 4.429-1.953.857-1.047 1.095-2.428.762-3.952-.62-2.714-2.858-3.667-4.762-3.667-1.62 0-3.19.667-4.238 1.762-.905.953-1.381 2.238-1.286 3.667Z"
      />
    </g>
    <mask
      id="v"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#v)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8.905 11.192c1.524 5.857 10.905 4.38 10.571-1.524C19.048 2.62 7.43 3.954 8.905 11.192Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="w"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#w)">
      <path
        fill="#000"
        d="M13.904 15.094c-2.047 0-4.428-1-5.19-3.858-.334-1.666 0-3.19.952-4.333 1.048-1.286 2.762-2.048 4.62-2.048 2.475 0 5.094 1.477 5.285 4.81.095 1.38-.334 2.619-1.286 3.619-1 1.095-2.667 1.81-4.38 1.81Zm.381-9.905c-1.762 0-3.38.714-4.38 1.905-.906 1.095-1.191 2.476-.858 4.047.667 2.667 2.952 3.62 4.857 3.62 1.62 0 3.19-.62 4.19-1.715a4.37 4.37 0 0 0 1.191-3.381c-.095-2.048-1.476-4.476-5-4.476Z"
      />
    </g>
    <mask
      id="x"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#x)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M23.428 18.19c0 .857.19 1.857.048 2.809-.238.428-.667.476-1.048.619a1.654 1.654 0 0 1-1.19-.905c-.143-1.047.047-2.095.095-3.143l2.095.62Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="y"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#y)">
      <path
        fill="#000"
        d="M22.427 21.81a1.727 1.727 0 0 1-1.333-1c-.095-.761-.048-1.476 0-2.19.048-.333.048-.667.048-1v-.19l2.428.762v.095c0 .286.048.571.048.905.048.619.095 1.285 0 1.904v.048c-.19.38-.524.476-.857.619-.095-.048-.19 0-.334.048Zm-1.047-1.142c.19.428.571.714 1 .81.095-.048.19-.048.238-.096.286-.095.524-.19.667-.429.095-.57.047-1.19 0-1.809 0-.286-.048-.571-.048-.81l-1.81-.571c0 .286-.047.571-.047.81-.048.761-.095 1.428 0 2.095Z"
      />
    </g>
    <mask
      id="z"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#z)">
      <path
        fill="#000"
        fillRule="evenodd"
        d="M13.096 10.238c0 .952-.714 1.714-1.571 1.714-.858 0-1.572-.762-1.572-1.714 0-.953.714-1.715 1.572-1.715.857 0 1.571.762 1.571 1.715Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="A"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#A)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M12.57 10.62c0 .238-.19.429-.38.429s-.381-.19-.381-.429c0-.238.19-.429.38-.429.239 0 .381.19.381.429Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="B"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#B)">
      <path
        fill="#000"
        fillRule="evenodd"
        d="M26.381 9.808c0 .952-.714 1.714-1.571 1.714s-1.572-.762-1.572-1.714.715-1.714 1.572-1.714c.857 0 1.571.762 1.571 1.714Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="C"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#C)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M25.904 10.19c0 .238-.143.429-.38.429-.191 0-.382-.19-.382-.429 0-.238.143-.428.381-.428.19 0 .381.19.381.428Zm-7.047 7.905c-.715 1.667.38 5.048 2.285 2.572-.143-1.048.048-2.096.096-3.143l-2.381.571Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="D"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#D)">
      <path
        fill="#000"
        d="M19.857 21.714c-.333 0-.667-.19-.905-.572-.524-.762-.619-2.19-.238-3.095l.048-.095 2.619-.667v.19l-.048 1.048c-.047.715-.095 1.381 0 2.096v.047l-.047.048c-.477.666-.953 1-1.429 1ZM19 18.238c-.286.81-.19 2.095.238 2.714.19.285.38.428.619.428.333 0 .714-.285 1.095-.761-.095-.715-.047-1.43.048-2.096l.047-.81-2.047.524Z"
      />
    </g>
    <mask
      id="E"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#E)">
      <path
        fill="#F6D2A2"
        fillRule="evenodd"
        d="M19.096 14.858c-1.285.096-2.333 1.667-1.666 2.858.904 1.619 2.857-.143 4.095 0 1.428.047 2.571 1.523 3.714.285 1.286-1.38-.571-2.714-1.952-3.333l-4.19.19Z"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="F"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#F)">
      <path
        fill="#231F20"
        d="M24.238 18.666c-.428 0-.857-.19-1.285-.38-.429-.191-.905-.382-1.429-.382h-.143c-.38 0-.81.143-1.285.334-.524.19-1.048.333-1.524.333-.572 0-1-.238-1.286-.762-.333-.571-.286-1.238.048-1.857a2.343 2.343 0 0 1 1.762-1.238l4.238-.19h.047c1.048.428 2.238 1.238 2.477 2.19.095.476-.048.952-.43 1.38-.38.43-.761.572-1.19.572Zm-2.666-1.047c.524 0 1.047.238 1.524.428.428.19.81.334 1.19.334.333 0 .62-.143.905-.429.333-.333.428-.714.38-1.095-.19-.81-1.333-1.572-2.237-1.953l-4.143.19c-.62.049-1.19.477-1.524 1.048-.286.524-.286 1.096-.048 1.572.239.428.524.619 1 .619.429 0 .905-.19 1.381-.333.524-.19.953-.334 1.429-.334 0-.095.048-.095.143-.047Z"
      />
    </g>
    <mask
      id="G"
      width={width}
      height={height}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h43.095v60H0V0Z" />
    </mask>
    <g mask="url(#G)">
      <path
        fill="#000"
        fillRule="evenodd"
        d="M18.953 14.808c-.095-2.238 4.19-2.524 4.666-.667.524 1.905-4.476 2.333-4.666.667Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
export default GoIcon;
