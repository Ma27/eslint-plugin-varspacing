### Submitting changes

#### Commit messages

In order to avoid a blown history full of ``fix foobar typo whatever`` commits, you should squash your changes
into bigger chunks unless you're working on a big change.
In this case the commits should be splitted into logical chunks, so everyone can verify what was happening.

The commit message should always reference the ticket and should contain in the first line a short summary of what is happening.
In the next lines a more detailed description should be placed.
This may look like this:

``` code
 #123 - refactor foo
 
 - drop ancient bar implementation
 - move baz into private class
 - resolves #123
```

#### Requirements for a mergeable PR

##### Tests

Yes, every code change requires its own testcase in order to avoid regression bugs.
The tests must be green and should cover the introduced changes.

##### Reviews

Every commit must be reviewed by a collaborator.
After this the changes must be fixed and the commit should be squashed into the previous one.

### Controversial changes

If your change would affect a lot of parts inside the package and does a lot of stuff,
it is better to open an issue before in order to discuss about this change.

So you can avoid a lot of work if the request is rejected it has been talked about it before requesting merge of new stuff.
