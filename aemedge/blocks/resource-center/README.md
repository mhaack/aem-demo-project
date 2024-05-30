# Design

[Figma](https://www.figma.com/file/oSetT4LbatRmXlcB2A7V8Z/Content-Hubs-2024?type=design&node-id=268%3A3637&mode=design&t=QTdKK8GJHTzw200x-1)

# HTML structure of an article card list
(as rendered by the block)

```
<ul class="article-list">
   <li class="card">
      <a href="/blog/2024/01/ai-act-dont-hesitate">
         <picture>
            <source type="image/webp" srcset="/blog/2024/01/media_1148e6c5b0671de9ac5dcc2be84cf47cbbb474e9f.jpeg?width=750&amp;format=webply&amp;optimize=medium">
            <img loading="lazy" alt="" src="/blog/2024/01/media_1148e6c5b0671de9ac5dcc2be84cf47cbbb474e9f.jpeg?width=750&amp;format=jpeg&amp;optimize=medium">
         </picture>
      </a>
      <span class="cardcontent"><span class="template">Blog</span><span class="title">Act, Don't Hesitate, on AI</span><span class="author">By <a href="/author/thomassaueressig"><span>Thomas Saueressig</span></a></span><span class="date">15 January 2024</span></span>
   </li>
   <li class="card">
      <a href="/blog/2024/01/new-ai-driven-retail-capabilities-enhance-customer-experience">
         <picture>
            <source type="image/webp" srcset="/blog/2024/01/media_194f48e78e80dac830ab294d574ec0579adbf3772.jpeg?width=750&amp;format=webply&amp;optimize=medium">
            <img loading="lazy" alt="" src="/blog/2024/01/media_194f48e78e80dac830ab294d574ec0579adbf3772.jpeg?width=750&amp;format=jpeg&amp;optimize=medium">
         </picture>
      </a>
      <span class="cardcontent"><span class="template">Newsbyte</span><span class="title">SAP Announces New AI-Driven Retail Capabilities</span><span class="author">By <a href="/author/sapnews"><span>SAP News</span></a></span><span class="date">11 January 2024</span></span>
   </li>
   <li class="card">
      <a href="/blog/2023/12/being-human-in-the-age-of-ai">
         <picture>
            <source type="image/webp" srcset="/blog/2023/12/media_1bb8d38bbf8f3eb19f164e5955e2749dcdfb9da19.jpeg?width=750&amp;format=webply&amp;optimize=medium">
            <img loading="lazy" alt="" src="/blog/2023/12/media_1bb8d38bbf8f3eb19f164e5955e2749dcdfb9da19.jpeg?width=750&amp;format=jpeg&amp;optimize=medium">
         </picture>
      </a>
      <span class="cardcontent"><span class="template">Blog</span><span class="title">Being Human in the Age of AI</span><span class="author">By <a href="/author/thomassaueressig"><span>Thomas Saueressig</span></a></span><span class="date">20 December 2023</span></span>
   </li>
</ul>```

