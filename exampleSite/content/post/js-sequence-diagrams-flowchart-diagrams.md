---
title: "JS Sequence Diagrams and Flowchart Diagrams"
date: 2015-03-04T21:57:50+08:00

sequenceDiagrams: 
  enable: true
  options: "{theme: 'string',css_class: 'string'}"
  
flowchartDiagrams:
  enable: true
  options: "{
              'x': 0,
              'y': 0,
              'line-width': 3,
              'line-length': 50,
              'text-margin': 10,
              'font-size': 14,
              'font-color': 'black',
              'line-color': 'black',
              'element-color': 'black',
              'fill': 'white',
              'yes-text': 'yes',
              'no-text': 'no',
              'arrow-end': 'block',
              'scale': 1,
              'i-am-a-comment-1': 'Do not use //!',
              'i-am-a-comment-2': 'style symbol types',
              'symbols': {
                  'start': {
                    'font-color': 'red',
                    'element-color': 'green',
                    'fill': 'yellow'
                  },
                  'end': {
                      'class': 'end-element'
                  }
              },
              'i-am-a-comment-3': 'even flowstate support ;-)',
              'flowstate': {
                'request': {'fill': 'blue'}
              }
            }"
---

## Sequence Usage

```sequence
Andrew->China: Says Hello
Note right of China: China thinks\nabout it
China-->Andrew: How are you?
Andrew->>China: I am good thanks!
```

<!--more-->

    ```sequence
    Andrew->China: Says Hello
    Note right of China: China thinks\nabout it
    China-->Andrew: How are you?
    Andrew->>China: I am good thanks!
    ```

## Configuration

Configure for all home and regular pages:

```toml
[params.sequenceDiagrams]
  enable = true
  options = "{theme: 'hand'}"
```

Configure for a single post in the front matter (**Params in front matter have higher precedence**):

```yml
sequenceDiagrams: 
  enable: true
  options: "{theme: 'hand'}"
```

### Options

```js
options = {
  // Change the styling of the diagram, typically one of 'simple', 'hand'. New themes can be registered with registerTheme(...).
  theme: string,

  // CSS style to apply to the diagram's svg tag. (Only supported if using snap.svg)
  css_class: string,
}
```

See more information from https://github.com/bramp/js-sequence-diagrams.

## Sequence Examples

```sequence
Title: Here is a title
A->B: Normal line
B-->C: Dashed line
C->>D: Open arrow
D-->>A: Dashed open arrow
```

    ```sequence
    Title: Here is a title
    A->B: Normal line
    B-->C: Dashed line
    C->>D: Open arrow
    D-->>A: Dashed open arrow
    ```

---

```sequence
# Example of a comment.
Note left of A: Note to the\n left of A
Note right of A: Note to the\n right of A
Note over A: Note over A
Note over A,B: Note over both A and B
```

    ```sequence
    # Example of a comment.
    Note left of A: Note to the\n left of A
    Note right of A: Note to the\n right of A
    Note over A: Note over A
    Note over A,B: Note over both A and B
    ```



## Flowchart Usage

```flowchart
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|request

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```

<!--more-->

    ```flowchart
    st=>start: Start|past:>http://www.google.com[blank]
    e=>end: End:>http://www.google.com
    op1=>operation: My Operation|past
    op2=>operation: Stuff|current
    sub1=>subroutine: My Subroutine|invalid
    cond=>condition: Yes
    or No?|approved:>http://www.google.com
    c2=>condition: Good idea|rejected
    io=>inputoutput: catch something...|request
    
    st->op1(right)->cond
    cond(yes, right)->c2
    cond(no)->sub1(left)->op1
    c2(yes)->io->e
    c2(no)->op2->e
    ```

## Flowchart Configuration

Configure for all home and regular pages:

```toml
[params.flowchartDiagrams]
  enable = true
  options = ""
```

Configure for a single post in the front matter (**Params in front matter have higher precedence**):

```yml
flowchartDiagrams:
  enable: true
  options: "{
              'x': 0,
              'y': 0,
              'line-width': 3,
              'line-length': 50,
              'text-margin': 10,
              'font-size': 14,
              'font-color': 'black',
              'line-color': 'black',
              'element-color': 'black',
              'fill': 'white',
              'yes-text': 'yes',
              'no-text': 'no',
              'arrow-end': 'block',
              'scale': 1,
              'i-am-a-comment-1': 'Do not use /​/!',
              'i-am-a-comment-2': 'style symbol types',
              'symbols': {
                  'start': {
                    'font-color': 'red',
                    'element-color': 'green',
                    'fill': 'yellow'
                  },
                  'end': {
                      'class': 'end-element'
                  }
              },
              'i-am-a-comment-3': 'even flowstate support ;-)',
              'flowstate': {
                'request': {'fill': 'blue'}
              }
            }"
```

See more information from https://github.com/adrai/flowchart.js.
