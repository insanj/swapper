# swapper
🤝 webapp to transfer player profiles between minecraft saves

## How to Use

### Singleplayer -> Multiplayer

1. Upload your `level.dat` from `/saves/world_name/level.dat`
2. Input the player `UUID` that will be used when exporting the playerdata
3. **Swap!** Place the `xxx-xxx-xxx-xxx.dat` file in `/saves/world_name/playerdata/`

### Multiplayer -> Singleplayer

1. Upload the `xxx-xxx-xxx-xxx.dat` file from `/saves/world_name/playerdata/` that has the same name as `UUID` of the player you wish to import to singleplayer
2. Upload the `level.dat` file from `/saves/world_name/level.dat`
3. **Swap!** Place the `level.dat` file in `/saves/world_name/`, replacing the old `level.dat`

## Authors

(c) 2019 Julian Weiss. github.com/insanj

## License

```
MIT License

Copyright (c) 2019 Julian Weiss

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
