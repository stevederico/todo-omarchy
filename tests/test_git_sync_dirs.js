"use strict"

const test = require("node:test")
const assert = require("node:assert/strict")
const GitSync = require("../GitSync.js")

test("parseSourceDirs unique repo roots from tab paths", () => {
  const dirs = GitSync.parseSourceDirs(JSON.stringify({
    sources: [
      { id: "a", path: "/home/sd/Todos/todos.md" },
      { id: "b", path: "/home/sd/Todos/books.md" },
      { id: "c", path: "/home/sd/other/list.md" }
    ]
  }))
  assert.deepEqual(dirs, ["/home/sd/Todos", "/home/sd/other"])
})

test("parseSourceDirs ignores bad payloads", () => {
  assert.deepEqual(GitSync.parseSourceDirs(""), [])
  assert.deepEqual(GitSync.parseSourceDirs("[]"), [])
  assert.deepEqual(GitSync.parseSourceDirs("not-json"), [])
  assert.deepEqual(GitSync.parseSourceDirs(JSON.stringify({ sources: [{ id: "x" }] })), [])
})
